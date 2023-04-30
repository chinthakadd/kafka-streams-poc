package com.chinthakad.kstreams.poc.web;

import com.chinthakad.kstreams.poc.web.model.ListResponse;
import com.chinthakad.kstreams.poc.web.model.TransferEnrichedDto;
import com.chinthakad.kstreams.poc.web.model.TransferRequestDto;
import com.chinthakad.kstreams.poc.web.model.UserCoreDto;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
public class BffController {
    @GetMapping("/users")
    public Mono<List<UserCoreDto>> getCustomers() {
        return WebClient.builder()
                .baseUrl("http://localhost:8081")
                .build()
                .get().uri("/users")
                .retrieve().bodyToMono(new ParameterizedTypeReference<ListResponse<UserCoreDto>>() {
                })
                .map(response -> response.getContent());
    }

    @PostMapping("/users")
    public Mono<UserCoreDto> addCustomer(@RequestBody UserCoreDto user) {
        return WebClient.builder()
                .baseUrl("http://localhost:8081")
                .build()
                .post().uri("/users")
                .bodyValue(user)
                .retrieve().bodyToMono(UserCoreDto.class);
    }

    @GetMapping("/transfers")
    public Mono<List<TransferEnrichedDto>> getTransfers() {
        return WebClient.builder()
                .baseUrl("http://localhost:8082")
                .build()
                .get().uri("/transfers-enriched")
                .retrieve().bodyToMono(new ParameterizedTypeReference<ListResponse<TransferEnrichedDto>>() {
                })
                .map(response -> response.getContent());
    }

    @PostMapping("/transfers")
    public Mono<Void> addTransfer(@RequestBody TransferRequestDto user) {
        return WebClient.builder()
                .baseUrl("http://localhost:8081")
                .build()
                .post().uri("/transfers")
                .bodyValue(user)
                .retrieve().bodyToMono(Void.class).then();
    }

}
