package com.chinthakad.kstreams.poc.corereadapi.entity;

import lombok.Data;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@ToString
@Document(collection = "transfers_enriched")
public class TransferEnrichedEntity {
    @Id
    private String id;
    private String fromUserId;
    private String fromUserName;
    private String toUserId;
    private String toUserName;
    private String amount;
    private String createdAt;
    private String lastUpdatedAt;
}
