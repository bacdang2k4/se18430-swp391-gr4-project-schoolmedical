package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.request.*;
import com.dinhbachihi.spring_security.entity.User;

public interface AuthenticationService {
    User signUp(SignUpRequest request);
    JwtAuthenticationResponse signIn(SignInRequest request);
    JwtAuthenticationResponse refreshToken(RefreshTokenRequest request);
    void verifyAccount(OtpRequest request);
    void sendOtp(SendOtpRequest request);
}
