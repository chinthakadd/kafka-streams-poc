package com.chinthakad.kstreams.poc.corewriteapi.repository;

import com.chinthakad.kstreams.poc.corewriteapi.entity.Transfer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferRepository extends CrudRepository<Transfer, Long> {
}
