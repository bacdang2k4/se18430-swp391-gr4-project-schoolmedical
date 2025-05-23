package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService {
    UserDetailsService userDetailsService();
}
