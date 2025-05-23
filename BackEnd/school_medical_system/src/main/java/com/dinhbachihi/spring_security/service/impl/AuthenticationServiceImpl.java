package com.dinhbachihi.spring_security.service.impl;

import com.dinhbachihi.spring_security.dto.JwtAuthenticationResponse;
import com.dinhbachihi.spring_security.dto.RefreshTokenRequest;
import com.dinhbachihi.spring_security.dto.SignInRequest;
import com.dinhbachihi.spring_security.dto.SignUpRequest;
import com.dinhbachihi.spring_security.entity.User;
import com.dinhbachihi.spring_security.repository.UserRepository;
import com.dinhbachihi.spring_security.service.AuthenticationService;
import com.dinhbachihi.spring_security.service.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    @Override
    public User signUp(SignUpRequest request){
        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("User already exists");
        }
        User user = new User();
        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        user.setRole(request.getRole());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        return userRepository.save(user);
    }

    public JwtAuthenticationResponse signIn(SignInRequest request){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail()
                , request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow(()
                -> new IllegalArgumentException("Invalid username or password"));
        var jwt = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);

        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setRefreshToken(refreshToken);
        return jwtAuthenticationResponse;
    }

    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest request){
        String userEmail = jwtService.extractUsername(request.getToken());
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        if(jwtService.isTokenValid(request.getToken(), user)){
            var jwt = jwtService.generateToken(user);
            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(request.getToken());
            return jwtAuthenticationResponse;
        }
        return null;
    }
}
