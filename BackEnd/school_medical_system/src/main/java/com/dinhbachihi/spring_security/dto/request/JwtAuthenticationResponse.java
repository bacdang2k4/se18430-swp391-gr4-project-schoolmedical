package com.dinhbachihi.spring_security.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class JwtAuthenticationResponse {
    private String token;
    private String refreshToken;
    private boolean enabled;
}
