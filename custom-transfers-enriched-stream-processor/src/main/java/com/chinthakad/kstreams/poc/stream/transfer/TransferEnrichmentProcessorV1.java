package com.chinthakad.kstreams.poc.stream.transfer;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;
import com.chinthakad.kstreams.poc.stream.transfer.serde.RegistryAwareAvroSerdes;
import com.chinthakad.kstreams.poc.stream.transfer.serde.RegistrylessAvroSerdes;
import com.chinthakad.kstreams.poc.models.CustomTransferEnriched;
import com.chinthakad.kstreams.poc.models.IngestionTransfer;
import com.chinthakad.kstreams.poc.models.IngestionUser;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.StreamsConfig;
import org.apache.kafka.streams.Topology;
import org.apache.kafka.streams.kstream.*;
import org.slf4j.LoggerFactory;

import java.util.Properties;

@Slf4j
public class TransferEnrichmentProcessorV1 {

    public static void main(String[] args) {
        log.info("===== Setting Log Level");
        Logger root = (Logger) LoggerFactory.getLogger(org.slf4j.Logger.ROOT_LOGGER_NAME);
        root.setLevel(Level.INFO);

        log.info("Start :" + TransferEnrichmentProcessorV1.class.getSimpleName());
        StreamsBuilder streamsBuilder = new StreamsBuilder();

        KStream<String, IngestionTransfer> transferStream = streamsBuilder.stream(
                "ingestion.transfers.plainavro",
                Consumed.with(Serdes.String(),
                        RegistrylessAvroSerdes.get(IngestionTransfer.class)));

        KTable<String, IngestionUser> userTable = streamsBuilder.table(
                "ingestion.users.plainavro",
                Consumed.with(Serdes.String(),
                        RegistrylessAvroSerdes.get(IngestionUser.class)));


        transferStream
                // data is deserialized based on k-stream's consumed.with()
                // data is serialized using consumed.with() serde
                // data is again consumed from the selectKey topic and deserialized using consumed.with() serde
                .selectKey((k, v) -> String.valueOf(v.getToUserId()),
                        Named.as("re-toUserId"))

                .join(userTable, (transfer, user) -> CustomTransferEnriched.newBuilder()
                        .setId(transfer.getId())
                        .setToUserId(transfer.getToUserId())
                        .setToUserName(user.getName())
                        .setFromUserId(transfer.getFromUserId())
                        .setFromUserName("NOT_SET") // until set. Avro Fields are mandatory.
                        .setAmount(transfer.getAmount())
                        .setCreatedAt(transfer.getCreatedAt())
                        .setLastUpdatedAt(transfer.getLastUpdatedAt())
                        .build())

                .peek((key, value) -> System.out.println("Key1:" + key + "=" + "value1:" + value), Named.as("peek-01"))


                // Assumption - deserialized as String, serialized as String since previous join didnt
                // define a serde.
                .selectKey((key, value) -> {
                    System.out.println("Key2:" + key + "=" + "value2:" + value);
                    return String.valueOf(value.getFromUserId());
                }, Named.as("re-fromUserId"))

//                .peek((key, value) -> System.out.println("Key2:" + key + "=" + "value2:" + value), Named.as("peek-02"))

                // Because of the Serde defined here, deserialized with Joined.with and serialized with it too.
                .join(userTable, (customTransferEnriched, user) -> {
                            System.out.println("Trying to Join");
                            customTransferEnriched.setFromUserName(user.getName());
                            return customTransferEnriched;
                        },
                        // Serialization
                        Joined.with(Serdes.String(),
                                RegistrylessAvroSerdes.get(CustomTransferEnriched.class),
                                RegistrylessAvroSerdes.get(IngestionUser.class)))

                .peek((key, value) -> System.out.println("Key3:" + key + "=" + "value3:" + value), Named.as("peek-03"))

                // serialized as string
                // deserialized as string
                .selectKey((key, value) -> {
                    System.out.println("Key3:" + key + "=" + "value3:" + value);
                    return String.valueOf(value.getId());
                }, Named.as("re-fromTransferId"))

                // TODO: Write a topic resolver if possible.
                // write in Avro Schema Format
                .to("custom.transfer-enriched",
                        Produced.with(Serdes.String(), RegistryAwareAvroSerdes.forCustomTransferEnriched()));


        // set the required properties for running Kafka Streams
        Properties config = new Properties();
        config.put(StreamsConfig.APPLICATION_ID_CONFIG, "raw-transfer-stream-processor-11");
        config.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:29092");

        // Read from the earliest Offset.
        config.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");

        // Serializer / Deserializer Config
        // Default ones are used for internal topics and topics to which Serdes are not specifically provided.
        // Encountered errors when this was not provided
        config.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        config.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());

        Topology topology = streamsBuilder.build();
        KafkaStreams streams = new KafkaStreams(topology, config);

        // close Kafka Streams when the JVM shuts down (e.g., SIGTERM)
        Runtime.getRuntime().addShutdownHook(new Thread(streams::close));
        streams.start();


        log.info("===========================");
        System.out.println(topology.describe().toString());
        log.info("===========================");
    }
}
