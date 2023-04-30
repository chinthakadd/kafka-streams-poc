package com.chinthakad.kstreams.poc;

import com.chinthakad.kstreams.poc.models.IngestionTransfer;
import com.chinthakad.kstreams.poc.serde.JsonRawIdDeserializer;
import com.chinthakad.kstreams.poc.serde.JsonTransferSerdeProvider;
import com.chinthakad.kstreams.poc.serde.RegistrylessAvroSerdes;
import com.chinthakad.kstreams.poc.model.RawId;
import com.chinthakad.kstreams.poc.model.RawTransfer;
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

import java.util.Properties;

/**
 * Similar to {@link RegistrylessIngestionUserProcessor} and done for transfers raw to ingestion.
 */
public class RegistrylessIngestionTransferProcessor {

    public static void main(String[] args) {
        System.out.println("Start :" + RegistrylessIngestionTransferProcessor.class.getSimpleName());

        StreamsBuilder streamsBuilder = new StreamsBuilder();
        final Serde<RawId> rawIdSerde = Serdes.serdeFrom(new JsonRawIdDeserializer(), new JsonRawIdDeserializer());
        final Serde<RawTransfer> rawTransferSerde = Serdes.serdeFrom(new JsonTransferSerdeProvider(), new JsonTransferSerdeProvider());

        KStream<RawId, RawTransfer> userRawStream = streamsBuilder.stream(
                "bankdb.kstreams-poc-db.transfers", Consumed.with(
                        rawIdSerde, rawTransferSerde
                ));

        KStream<String, IngestionTransfer> outputStream = userRawStream
                .map((key, value) -> {
                    System.out.println("Key:" + key + "=> Value: " + value);
                    // TODO: Introduce Avro.
                    return KeyValue.pair(key.getId(), IngestionTransfer.newBuilder()
                            .setId(value.getId())
                            .setFromUserId(value.getFromUserId())
                            .setToUserId(value.getToUserId())
                            // TODO: Handle Double Parsing Gracefully
                            .setAmount(Double.parseDouble(value.getAmount()))
                            .setCreatedAt(value.getCreatedAt())
                            .setLastUpdatedAt(value.getLastUpdatedAt())
                            .build());
                });
        outputStream.to("ingestion.transfers.plainavro", Produced.with(Serdes.String(),
                RegistrylessAvroSerdes.get(IngestionTransfer.class)));

        // set the required properties for running Kafka Streams
        Properties config = new Properties();
        config.put(StreamsConfig.APPLICATION_ID_CONFIG, "raw-transfer-ingestion-processor-01");
        config.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:29092");

        // Read from the earliest Offset.
        config.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");

        // Serializer / Deserializer Config
        // TODO: Do we need it in this current setup?
        config.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        config.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());

        KafkaStreams streams = new KafkaStreams(streamsBuilder.build(), config);

        // close Kafka Streams when the JVM shuts down (e.g., SIGTERM)
        Runtime.getRuntime().addShutdownHook(new Thread(streams::close));
        streams.start();
    }
}
