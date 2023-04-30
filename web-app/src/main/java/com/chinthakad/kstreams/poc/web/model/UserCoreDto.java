package com.chinthakad.kstreams.poc.web.model;

public class UserCoreDto {

    private Long id;
    private String name;
    private String createdAt;
    private String lastUpdatedAt;

    /**
     * =================================================================================================================
     */
    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
