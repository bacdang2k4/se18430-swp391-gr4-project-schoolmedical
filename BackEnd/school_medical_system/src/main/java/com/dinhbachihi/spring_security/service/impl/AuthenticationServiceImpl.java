package com.dinhbachihi.spring_security.service.impl;

import com.dinhbachihi.spring_security.dto.request.*;
import com.dinhbachihi.spring_security.entity.User;
import com.dinhbachihi.spring_security.exception.AppException;
import com.dinhbachihi.spring_security.exception.ErrorCode;
import com.dinhbachihi.spring_security.repository.UserRepository;
import com.dinhbachihi.spring_security.service.AuthenticationService;
import com.dinhbachihi.spring_security.service.JWTService;
import com.dinhbachihi.spring_security.service.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private final OtpService otpService;
    
    // In-memory blacklist for logged out tokens
    private static final Set<String> blacklistedTokens = new HashSet<>();

    @Override
    public User signUp(SignUpRequest request){
        if(userRepository.existsByEmail(request.getEmail())){
            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
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

    @Override
    public JwtAuthenticationResponse signIn(SignInRequest request) {
        JwtAuthenticationResponse response = new JwtAuthenticationResponse();
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_USERNAME_OR_PASSWORD));
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new AppException(ErrorCode.INVALID_USERNAME_OR_PASSWORD);
        }

        if (!user.isEnabled()) {
            response.setEnabled(false);
            return response;
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        String jwt = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);

        response.setToken(jwt);
        response.setRefreshToken(refreshToken);
        response.setEnabled(true);
        response.setRole(user.getRole());
        return response;
    }


    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest request){
        String userEmail = jwtService.extractUsername(request.getToken());
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        if(jwtService.isTokenValid(request.getToken(), user)){
            var jwt = jwtService.generateToken(user);
            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(request.getToken());
            jwtAuthenticationResponse.setRole(user.getRole());
            return jwtAuthenticationResponse;
        }
        return null;
    }

    @Override
    public void verifyAccount(OtpRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        if (user.getOtpCode() == null || !user.getOtpCode().equals(request.getOtp()) ||
                user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            throw new AppException(ErrorCode.INVALID_OTP);
        }

        user.setEnabled(true);
        user.setOtpCode(null);
        user.setOtpExpiry(null);
        userRepository.save(user);
    }

    @Override
    public void sendOtp(SendOtpRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        
        otpService.sendOtp(user);
    }
}
