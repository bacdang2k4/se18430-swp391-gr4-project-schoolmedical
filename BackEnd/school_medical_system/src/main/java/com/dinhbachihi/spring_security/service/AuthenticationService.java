package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.JwtAuthenticationResponse;
import com.dinhbachihi.spring_security.dto.RefreshTokenRequest;
import com.dinhbachihi.spring_security.dto.SignInRequest;
import com.dinhbachihi.spring_security.dto.SignUpRequest;
import com.dinhbachihi.spring_security.entity.User;

public interface AuthenticationService {
    User signUp(SignUpRequest request);
    JwtAuthenticationResponse signIn(SignInRequest request);
    JwtAuthenticationResponse refreshToken(RefreshTokenRequest request);
}
