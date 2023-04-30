package com.chinthakad.kstreams.poc;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;
import com.chinthakad.kstreams.poc.model.RawId;
import com.chinthakad.kstreams.poc.model.RawUser;
import com.chinthakad.kstreams.poc.models.IngestionUser;
import com.chinthakad.kstreams.poc.serde.JsonRawIdDeserializer;
import com.chinthakad.kstreams.poc.serde.JsonUserSerdeProvider;
import com.chinthakad.kstreams.poc.serde.RegistrylessAvroSerdes;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.KeyValue;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.StreamsConfig;
import org.apache.kafka.streams.kstream.Consumed;
import org.apache.kafka.streams.kstream.KStream;
import org.apache.kafka.streams.kstream.Produced;
import org.slf4j.LoggerFactory;

import java.util.Properties;

/**
 * This entire implementation omits the usage of Registry and provides a conversion between JSON based
 * input and Avro based output.
 * ---------------------------------------------------------------------------------------------------------------------
 * NOTE - JSON Schema
 * ---------------------------------------------------------------------------------------------------------------------
 * - Currently the raw-users topic contains JSON Messages produced by debezium connector
 * - This connector writes JSON with Schema Embedded (schema.enable = true in connector configuration)
 * - How to read this format? where format has `schema` and `payload` sections.
 * - Kafka Connect {@link org.apache.kafka.connect.json.JsonConverter} provides this support for Kafka Connect
 * Converters
 * - for Kafka Streams, we need to find a Serde. Looking at
 * {@link io.confluent.kafka.streams.serdes.json.KafkaJsonSchemaSerde},
 * this only provides the Schema Registry integrated Deserialization.
 * - For now, I am disabling schema inclusion from the Debezium Connector, so that I can read plain JSON using a
 * Json Serde. Refer: https://rmoff.net/2020/01/22/kafka-connect-and-schemas/
 * <p>
 * ---------------------------------------------------------------------------------------------------------------------
 * NOTE - JSON Payload
 * ---------------------------------------------------------------------------------------------------------------------
 * - Currently the messages debezium produces has before & after which is useful.
 * - However, if we are just interested in the latest record only (after update), that can be set by:
 * "transforms.unwrap.type":"io.debezium.transforms.UnwrapFromEnvelope"
 * <p>
 * https://medium.com/@adrian3ka/debezium-and-kstreams-to-handle-data-aggregation-a9c868a44518
 */
@Slf4j
public class RegistrylessIngestionUserProcessor {

    public static void main(String[] args) {
        log.info("===== Setting Log Level");
        Logger root = (Logger) LoggerFactory.getLogger(org.slf4j.Logger.ROOT_LOGGER_NAME);
        root.setLevel(Level.INFO);

        log.info("Start :" + RegistrylessIngestionUserProcessor.class.getSimpleName());

        StreamsBuilder streamsBuilder = new StreamsBuilder();
        final Serde<RawId> rawIdSerde = Serdes.serdeFrom(new JsonRawIdDeserializer(), new JsonRawIdDeserializer());
        final Serde<RawUser> rawUserSerde = Serdes.serdeFrom(new JsonUserSerdeProvider(), new JsonUserSerdeProvider());

        KStream<RawId, RawUser> userRawStream = streamsBuilder.stream("bankdb.kstreams-poc-db.users", Consumed.with(
                rawIdSerde, rawUserSerde
        ));

        KStream<String, IngestionUser> outputStream = userRawStream
                .map((key, value) -> {
                    System.out.println("Key:" + key + "=> Value: " + value);
                    if (value == null) return KeyValue.pair(key.getId(), null);
                    // TODO: Introduce Avro.
                    return KeyValue.pair(key.getId(), IngestionUser.newBuilder()
                            .setId(value.getId())
                            .setName(value.getName())
                            .setCreatedAt(value.getCreatedAt())
                            .setLastUpdatedAt(value.getLastUpdatedAt())
                            .build());
                });
        outputStream.to("ingestion.users.plainavro", Produced.with(Serdes.String(),
                RegistrylessAvroSerdes.get(IngestionUser.class)));

        // set the required properties for running Kafka Streams
        Properties config = new Properties();
        config.put(StreamsConfig.APPLICATION_ID_CONFIG, "raw-user-ingestion-processor-01");
        config.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:29092");

        // Read from the earliest Offset.
        config.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");

        // Serializer / Deserializer Config
        // TODO: Configure Avro.
        config.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        config.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());

        KafkaStreams streams = new KafkaStreams(streamsBuilder.build(), config);

        // close Kafka Streams when the JVM shuts down (e.g., SIGTERM)
        Runtime.getRuntime().addShutdownHook(new Thread(streams::close));
        streams.start();
    }
}
