package com.chinthakad.kstreams.poc.web.model;

import lombok.Data;
import lombok.ToString;

import java.math.BigDecimal;

@Data
@ToString
public class TransferRequestDto {

    private Long fromUserId;
    private Long toUserId;
    private BigDecimal amount;

}
