package com.chinthakad.kstreams.poc.serde;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.chinthakad.kstreams.poc.model.RawId;
import org.apache.kafka.common.serialization.Deserializer;
import org.apache.kafka.common.serialization.Serializer;

import java.io.IOException;
import java.util.Map;

public class JsonRawIdDeserializer implements Deserializer<RawId>, Serializer<RawId> {

    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void configure(Map<String, ?> configs, boolean isKey) {
        Deserializer.super.configure(configs, isKey);
    }

    @Override
    public RawId deserialize(String topic, byte[] data) {
        RawId rawId = null;
        try {
            rawId = objectMapper.readValue(data, RawId.class);
            System.out.println("Deser Raw ID:" + rawId);
            return rawId;
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Deser Error");
        }
    }

    @Override
    public void close() {
        Deserializer.super.close();
    }

    @Override
    public byte[] serialize(String topic, RawId data) {
        return new byte[0];
    }
}
