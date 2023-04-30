package com.chinthakad.kstreams.poc.corereadapi;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.MediaType;

@Configuration
public class DataRestConfig {
    @Bean
    public RepositoryRestConfigurer repositoryRestConfigurer()
    {
        return RepositoryRestConfigurer.withConfig(config -> {
            config.useHalAsDefaultJsonMediaType(false);
            config.setDefaultMediaType(MediaType.APPLICATION_JSON);
        });
    }
}
