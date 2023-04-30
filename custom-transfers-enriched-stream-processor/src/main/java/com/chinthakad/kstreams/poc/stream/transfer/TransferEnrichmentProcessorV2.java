package com.chinthakad.kstreams.poc.stream.transfer;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;
import com.chinthakad.kstreams.poc.stream.transfer.serde.RegistryAwareAvroSerdes;
import com.chinthakad.kstreams.poc.stream.transfer.serde.RegistrylessAvroSerdes;
import com.chinthakad.kstreams.poc.models.CustomTransferEnriched;
import com.chinthakad.kstreams.poc.models.IngestionTransfer;
import com.chinthakad.kstreams.poc.models.IngestionUser;
import com.chinthakad.kstreams.poc.models.UserWithTransfers;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.*;
import org.apache.kafka.streams.kstream.*;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Properties;
import java.util.stream.Collectors;

@Slf4j
public class TransferEnrichmentProcessorV2 {

    public static void main(String[] args) {
        log.info("===== Setting Log Level");
        Logger root = (Logger) LoggerFactory.getLogger(org.slf4j.Logger.ROOT_LOGGER_NAME);
        root.setLevel(Level.INFO);

        log.info("Start :" + TransferEnrichmentProcessorV2.class.getSimpleName());
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

                .groupByKey()
                .aggregate(
                        UserWithTransfers::new,
                        (key, value, aggregate) -> {
                            aggregate.setUserId(key);
                            aggregate.setName("NOT_SET");
                            if (aggregate.getTransfers() == null) aggregate.setTransfers(new ArrayList<>());
                            aggregate.getTransfers().add(value);
                            return aggregate;
                        },
                        Materialized.with(Serdes.String(), RegistrylessAvroSerdes.get(UserWithTransfers.class))
                )

                .join(userTable, (userWithAccounts, user) -> {
                    userWithAccounts.setName(user.getName());
                    return userWithAccounts;
                })

                .toStream()

                .flatMap((KeyValueMapper<String, UserWithTransfers, Iterable<KeyValue<String, CustomTransferEnriched>>>) (key, value) ->
                        value.getTransfers().stream().map(transfer ->
                                CustomTransferEnriched.newBuilder()
                                        .setId(transfer.getId())
                                        .setToUserId(transfer.getToUserId())
                                        .setToUserName(value.getName())
                                        .setFromUserId(transfer.getFromUserId())
                                        .setFromUserName("NOT_SET") // until set. Avro Fields are mandatory.
                                        .setAmount(transfer.getAmount())
                                        .setCreatedAt(transfer.getCreatedAt())
                                        .setLastUpdatedAt(transfer.getLastUpdatedAt())
                                        .build()
                        ).map(cte -> KeyValue.pair(String.valueOf(cte.getId()), cte)).collect(Collectors.toList()))

                // TODO: Write a topic resolver if possible.
                // write in Avro Schema Format
                .to("custom.transfer-enriched-v2",
                        Produced.with(Serdes.String(), RegistryAwareAvroSerdes.forCustomTransferEnriched()));


        // set the required properties for running Kafka Streams
        Properties config = new Properties();
        config.put(StreamsConfig.APPLICATION_ID_CONFIG, "raw-transfer-stream-processor-v2-01");
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
