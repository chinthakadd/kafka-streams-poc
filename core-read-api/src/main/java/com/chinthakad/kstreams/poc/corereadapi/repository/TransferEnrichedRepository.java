package com.chinthakad.kstreams.poc.corereadapi.repository;

import com.chinthakad.kstreams.poc.corereadapi.entity.TransferEnrichedEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "transfers-enriched", path = "transfers-enriched")
public interface TransferEnrichedRepository extends MongoRepository<TransferEnrichedEntity, String> {
}
