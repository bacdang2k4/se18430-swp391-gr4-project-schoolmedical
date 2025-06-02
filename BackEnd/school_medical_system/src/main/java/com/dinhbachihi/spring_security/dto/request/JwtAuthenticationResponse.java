package com.dinhbachihi.spring_security.dto.request;

import lombok.Data;

@Data
public class JwtAuthenticationResponse {
    private String token;
    private String refreshToken;
    private boolean enabled;
}
