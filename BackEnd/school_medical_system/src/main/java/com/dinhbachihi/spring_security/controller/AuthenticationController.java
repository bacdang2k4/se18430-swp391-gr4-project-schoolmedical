package com.dinhbachihi.spring_security.controller;

import com.dinhbachihi.spring_security.dto.request.JwtAuthenticationResponse;
import com.dinhbachihi.spring_security.dto.request.RefreshTokenRequest;
import com.dinhbachihi.spring_security.dto.request.SignInRequest;
import com.dinhbachihi.spring_security.dto.request.SignUpRequest;
import com.dinhbachihi.spring_security.dto.response.ApiResponse;
import com.dinhbachihi.spring_security.entity.User;
import com.dinhbachihi.spring_security.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
}
