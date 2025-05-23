package com.dinhbachihi.spring_security.controller;

import com.dinhbachihi.spring_security.dto.JwtAuthenticationResponse;
import com.dinhbachihi.spring_security.dto.RefreshTokenRequest;
import com.dinhbachihi.spring_security.dto.SignInRequest;
import com.dinhbachihi.spring_security.dto.SignUpRequest;
import com.dinhbachihi.spring_security.entity.User;
import com.dinhbachihi.spring_security.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<User> signUp(@RequestBody SignUpRequest request){
        return ResponseEntity.ok(authenticationService.signUp(request));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponse> signIn(@RequestBody SignInRequest request){
        return ResponseEntity.ok(authenticationService.signIn(request));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<JwtAuthenticationResponse> refreshToken(@RequestBody RefreshTokenRequest request){
        return ResponseEntity.ok(authenticationService.refreshToken(request));
    }
}
