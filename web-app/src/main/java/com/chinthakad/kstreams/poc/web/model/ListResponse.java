package com.chinthakad.kstreams.poc.web.model;

import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@ToString
public class ListResponse<T> {
    private List<T> content;
}
