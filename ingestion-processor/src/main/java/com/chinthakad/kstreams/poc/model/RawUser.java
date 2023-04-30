package com.chinthakad.kstreams.poc.model;

import lombok.Data;
import lombok.ToString;

import java.time.Instant;

@Data
@ToString
public class RawUser {

    private Long id;
    private String name;
    /**
     * Treating these as Strings as this is just pass through.
     */
    private String createdAt;
    private String lastUpdatedAt;

}
