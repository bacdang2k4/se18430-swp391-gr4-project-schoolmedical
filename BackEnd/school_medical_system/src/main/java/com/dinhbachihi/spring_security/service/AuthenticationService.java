package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.request.JwtAuthenticationResponse;
import com.dinhbachihi.spring_security.dto.request.RefreshTokenRequest;
import com.dinhbachihi.spring_security.dto.request.SignInRequest;
import com.dinhbachihi.spring_security.dto.request.SignUpRequest;
import com.dinhbachihi.spring_security.entity.User;

public interface AuthenticationService {
    User signUp(SignUpRequest request);
    JwtAuthenticationResponse signIn(SignInRequest request);
    JwtAuthenticationResponse refreshToken(RefreshTokenRequest request);
}
