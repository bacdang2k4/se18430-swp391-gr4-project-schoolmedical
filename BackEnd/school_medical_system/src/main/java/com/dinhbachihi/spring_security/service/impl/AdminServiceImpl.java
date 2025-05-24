package com.dinhbachihi.spring_security.service.impl;

import com.dinhbachihi.spring_security.dto.UpdateRequest;
import com.dinhbachihi.spring_security.entity.User;
import com.dinhbachihi.spring_security.repository.UserRepository;
import com.dinhbachihi.spring_security.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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
    public String updateUserByEmail(UpdateRequest request, String email){
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        User user = getUserByEmail(email);
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
        return "User updated";
    }
    public List<String> getAllStudentsEmails(){
        return userRepository.findByEmailStartingWith("h").stream().map(User::getEmail).collect(Collectors.toList());
    }
}
