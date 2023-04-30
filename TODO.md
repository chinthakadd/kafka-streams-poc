## Phase 1 - DONE


- Initial Design - DONE
- Complete the docker-compose - DONE
    - Kafka - Standard
    - MongoDB
    - MySQL with Standard Init Scripts to create the collection
- Create a multi-module project - DONE
- Build Core Write APIs to MySQL - DONE
- Postman Collection - DONE

## Phase 2 - DONE

- Research on MySQL Connectors - DONE
- Create Ingestion Connector with JSON Schema - DONE 
- Create Raw - Ingestion Processor (Work in Local) with Static Avro Schema (No Schema Registry)  - DONE
  - Basic Code - DONE
  - Introduce Avro - Specific Record with Registry-less Avro - DONE
- Create Custom Transfer Processor (Work in Local) - using basic Kafka Streams (Static Avro Schema)  - DONE
- Add Schema Registry to Docker-Compose (Not Used) - DONE
- Clean up and Make Docker Compose Better - DONE

## Phase 3

- Introduce Avro Schema Registry and apply to processors - DONE
- Research on Mongo Connectors - DONE  
- Create Custom Transfer Enriched Sink Connector - DONE
  - Refer
    - https://docs.mongodb.com/kafka-connector/current/sink-connector/configuration-properties/kafka-topic/
    - https://github.com/mongodb/mongo-kafka/blob/r1.6.1/config/MongoSinkConnector.properties
- Build Read API from MongoDB - DONE
- Test for Delete / Update (Tombstone) and Updates and see how stream processor work - DONE
- Create BFF APIs - DONE
- UI Integration - DONE

## Phase 4

- Handle Update User KTable Scenario - IN-PROGRESS
- Introduce Spring Kafka to Custom Transfer Stream Processor
- Introduce Error Handling across all places
  - Invalid Schema Errors
  - Invalid Data Errors
  - Broker Errors
  - Shutdown and Restarts


## Phase 5

- Create Transfer Core Read with a state store and introduce a Push API**
- Retry Logic Implementation for Bad Messages
- Pre-generate topics with partitions and replication
- Topology.describe() and exposing the topology as metadata
- Build a Windowed Aggregation Use-case
- Kubernetes Deployment
- Metrics 

## Phase - Nice to Have 

- Async API Schema
- Create an automated run script
- Read about Compaction Topic and setting it up
- Enable GraphQL APIs in the Serving Layer
- Re-visit Avro Naming Conventions

## TODO - Read

### Serdes

- Read https://www.confluent.io/blog/kafka-connect-deep-dive-converters-serialization-explained/
- Read https://docs.confluent.io/platform/current/streams/developer-guide/datatypes.html
- Read https://docs.confluent.io/platform/current/schema-registry/serdes-develop/index.html

## Questions

- How to read embedded JSON Schemas and make it useful?