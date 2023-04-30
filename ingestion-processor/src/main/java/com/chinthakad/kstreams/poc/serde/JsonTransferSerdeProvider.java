package com.chinthakad.kstreams.poc.serde;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.chinthakad.kstreams.poc.model.RawTransfer;
import org.apache.kafka.common.serialization.Deserializer;
import org.apache.kafka.common.serialization.Serializer;

import java.io.IOException;
import java.util.Map;

public class JsonTransferSerdeProvider implements Deserializer<RawTransfer>, Serializer<RawTransfer> {

    private ObjectMapper objectMapper = new ObjectMapper()
            .setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);

    @Override
    public void configure(Map<String, ?> configs, boolean isKey) {
        Deserializer.super.configure(configs, isKey);
    }

    @Override
    public RawTransfer deserialize(String topic, byte[] data) {
        try {
            JsonNode json = objectMapper.readValue(data, JsonNode.class);
            RawTransfer rawTransfer = objectMapper.readValue(json.get("after").toString(), RawTransfer.class);
            System.out.println("Deser Raw Transfer: " + rawTransfer);
            return rawTransfer;
        } catch (IOException e) {
            e.printStackTrace();
            // TODO: Handle Exceptions.
            throw new RuntimeException("Exception in Deser");
        }
    }

    @Override
    public void close() {
        Deserializer.super.close();
    }

    @Override
    public byte[] serialize(String topic, RawTransfer data) {
        return new byte[0];
    }
}
