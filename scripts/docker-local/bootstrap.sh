#!/bin/bash

# ----------------------------------------------------------------------------------------------------------------------
# docker compose -f ./docker-compose-v1.yaml up -d

# ----------------------------------------------------------------------------------------------------------------------
echo "Creating Ingestion Connector"

curl --location --request POST 'localhost:8092/connectors/' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "bank-sor-ingestor-04",
  "config": {
    "connector.class": "io.debezium.connector.mysql.MySqlConnector",
    "tasks.max": "1",
    "database.hostname": "mysql",
    "database.port": "3306",
    "database.user": "root",
    "database.password": "kstreams-poc-pwd",
    "database.server.id": "20000",
    "database.server.name": "bankdb",
    "database.include.list": "kstreams-poc-db",
    "database.history.kafka.bootstrap.servers": "kafka:9092",
    "database.history.kafka.topic": "_bank.ddl.history",
    "database.allowPublicKeyRetrieval": "true",
    "key.converter": "org.apache.kafka.connect.json.JsonConverter",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter",
    "value.converter.schemas.enable":"false",
    "key.converter.schemas.enable":"false",
    "decimal.handling.mode": "string"
  }
}'

# ----------------------------------------------------------------------------------------------------------------------
echo "Creating Ingestion Connector"

curl --location --request POST 'localhost:8092/connectors/' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "ods-mongo-sink-04",
  "config": {

    "connector.class": "com.mongodb.kafka.connect.MongoSinkConnector",
    "tasks.max": "1",

    "topics": "custom.transfer-enriched",

    "key.converter": "org.apache.kafka.connect.storage.StringConverter",

    "value.converter": "io.confluent.connect.avro.AvroConverter",
    "value.converter.schema.registry.url": "http://schema-registry:8081",

    "connection.uri": "mongodb://kstreams-poc-user:kstreams-poc-pwd@mongo:27017",
    "database": "kstreams-ods",
    "collection": "transfers_enriched",

    "max.num.retries": 1,
    "retries.defer.timeout": 5000,

    "delete.on.null.values": "false",
    "writemodel.strategy": "com.mongodb.kafka.connect.sink.writemodel.strategy.ReplaceOneDefaultStrategy"

  }
}'

# ----------------------------------------------------------------------------------------------------------------------
echo "Creating Users"

curl --location --request POST 'http://localhost:8081/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Chinthaka"
}'

curl --location --request POST 'http://localhost:8081/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Pahan"
}'

curl --location --request POST 'http://localhost:8081/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Ramitha"
}'

curl --location --request POST 'http://localhost:8081/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Ganeshji"
}'

# ----------------------------------------------------------------------------------------------------------------------
echo "Creating Transfers"

curl --location --request POST 'http://localhost:8081/transfers' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--data-raw '{
    "fromUserId": "1",
    "toUserId": "2",
    "amount": "10"
}'


curl --location --request POST 'http://localhost:8081/transfers' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--data-raw '{
    "fromUserId": "2",
    "toUserId": "3",
    "amount": "100"
}'

curl --location --request POST 'http://localhost:8081/transfers' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--data-raw '{
    "fromUserId": "4",
    "toUserId": "1",
    "amount": "1000"
}'