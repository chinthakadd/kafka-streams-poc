package com.chinthakad.kstreams.poc.stream.transfer.serde;

import org.apache.avro.specific.SpecificRecordBase;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serdes;

public class RegistrylessAvroSerdes {

    private RegistrylessAvroSerdes() {
        // do not allow instantiation
    }

    public static <T extends SpecificRecordBase> Serde<T> get(Class<T> clazz) {
        RegistrylessAvroSerializer<T> serializer = new RegistrylessAvroSerializer<>(clazz);
        RegistrylessAvroDeserializer<T> deserializer = new RegistrylessAvroDeserializer<>(clazz);
        return Serdes.serdeFrom(serializer, deserializer);
    }
}
