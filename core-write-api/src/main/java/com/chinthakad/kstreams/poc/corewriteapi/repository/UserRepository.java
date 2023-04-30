package com.chinthakad.kstreams.poc.corewriteapi.repository;

import com.chinthakad.kstreams.poc.corewriteapi.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
}
