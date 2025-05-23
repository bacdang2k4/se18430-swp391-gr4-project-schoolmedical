package com.dinhbachihi.spring_security.service.impl;

import com.dinhbachihi.spring_security.entity.User;
import com.dinhbachihi.spring_security.repository.UserRepository;
import com.dinhbachihi.spring_security.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    private final UserRepository userRepository;

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUserByEmail(String email){
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    @Transactional
    public String deleteUserByEmail(String email){
        userRepository.deleteByEmail(email);
        return "User deleted";
    }
}
