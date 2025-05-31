package com.dinhbachihi.spring_security.controller;

import com.dinhbachihi.spring_security.dto.request.*;
import com.dinhbachihi.spring_security.dto.response.ApiResponse;
import com.dinhbachihi.spring_security.entity.User;
import com.dinhbachihi.spring_security.exception.AppException;
import com.dinhbachihi.spring_security.exception.ErrorCode;
import com.dinhbachihi.spring_security.repository.UserRepository;
import com.dinhbachihi.spring_security.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ApiResponse<User> signUp(@Valid @RequestBody SignUpRequest request){
        ApiResponse<User> response = new ApiResponse<>();
        response.setMessage("Sign up Successfully");
        response.setResult(authenticationService.signUp(request));
        return response;
    }

    @PostMapping("/login")
    public ApiResponse<JwtAuthenticationResponse> signIn(@RequestBody SignInRequest request){
        ApiResponse<JwtAuthenticationResponse> response = new ApiResponse<>();
        response.setMessage("Login Successfully");
        response.setResult(authenticationService.signIn(request));
        return response;
    }

    @PostMapping("/refresh-token")
    public ApiResponse<JwtAuthenticationResponse> refreshToken(@RequestBody RefreshTokenRequest request){
        ApiResponse<JwtAuthenticationResponse> response = new ApiResponse<>();
        response.setMessage("Refresh token Successfully");
        response.setResult(authenticationService.refreshToken(request));
        return response;
    }

    @PostMapping("/verify-otp")
    public ApiResponse<String> verifyOtp(@RequestBody OtpRequest request) {
        ApiResponse<String> response = new ApiResponse<>();
        authenticationService.verifyAccount(request);
        response.setMessage("Account verified");
        return response;
    }

}
