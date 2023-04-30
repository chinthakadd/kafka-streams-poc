package com.chinthakad.kstreams.poc.model;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class RawTransfer {
    private Long id;
    private Long fromUserId;
    private Long toUserId;
    private String amount;
    /**
     * Treating these as Strings as this is just pass through.
     */
    private String createdAt;
    private String lastUpdatedAt;
}
