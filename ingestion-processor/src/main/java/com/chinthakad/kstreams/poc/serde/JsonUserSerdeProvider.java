package com.chinthakad.kstreams.poc.serde;

import com.chinthakad.kstreams.poc.model.RawUser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import org.apache.kafka.common.serialization.Deserializer;
import org.apache.kafka.common.serialization.Serializer;

import java.io.IOException;
import java.util.Map;

public class JsonUserSerdeProvider implements Deserializer<RawUser>, Serializer<RawUser> {

    private ObjectMapper objectMapper = new ObjectMapper()
            .setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);

    @Override
    public void configure(Map<String, ?> configs, boolean isKey) {
        Deserializer.super.configure(configs, isKey);
    }

    @Override
    public RawUser deserialize(String topic, byte[] data) {
        JsonNode json = null;
        try {
            if (data == null) return null;
            json = objectMapper.readValue(data, JsonNode.class);
            RawUser rawUser = objectMapper.readValue(json.get("after").toString(), RawUser.class);
            System.out.println("Deser Raw User: " + rawUser);
            return rawUser;
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
    public byte[] serialize(String topic, RawUser data) {
        return new byte[0];
    }
}
