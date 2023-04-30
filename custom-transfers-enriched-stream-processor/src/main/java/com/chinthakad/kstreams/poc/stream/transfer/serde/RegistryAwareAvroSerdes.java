package com.chinthakad.kstreams.poc.stream.transfer.serde;

import com.chinthakad.kstreams.poc.models.CustomTransferEnriched;
import io.confluent.kafka.serializers.AbstractKafkaSchemaSerDeConfig;
import io.confluent.kafka.streams.serdes.avro.SpecificAvroSerde;
import org.apache.kafka.common.serialization.Serde;

import java.util.Map;

public class RegistryAwareAvroSerdes {

    private RegistryAwareAvroSerdes() {
    }

    public static Serde<CustomTransferEnriched> forCustomTransferEnriched() {
        Serde<CustomTransferEnriched> serde = new SpecificAvroSerde<>();
        serde.configure(Map.of(AbstractKafkaSchemaSerDeConfig.SCHEMA_REGISTRY_URL_CONFIG,
                "http://localhost:8091"), false);
        return serde;
    }
}
