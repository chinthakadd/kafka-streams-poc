package com.chinthakad.kstreams.poc.web.model;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class TransferEnrichedDto {
    private String id;
    private String fromUserId;
    private String fromUserName;
    private String toUserId;
    private String toUserName;
    private String amount;
    private String createdAt;
    private String lastUpdatedAt;
}
