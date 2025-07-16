package com.dinhbachihi.spring_security.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.dinhbachihi.spring_security.dto.request.UserUpdateRequest;
import com.dinhbachihi.spring_security.entity.User;

import java.util.Map;

public interface UserService {
    UserDetailsService userDetailsService();
    User getUserProfileByEmail(String email);
    User updateUserProfile(String email, UserUpdateRequest request);
    Map<String, Object> getUserReport();
}
