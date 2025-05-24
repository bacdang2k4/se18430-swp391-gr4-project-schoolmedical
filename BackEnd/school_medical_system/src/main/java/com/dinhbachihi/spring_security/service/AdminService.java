package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.request.SendMailRequest;
import com.dinhbachihi.spring_security.dto.request.UserUpdateRequest;
import com.dinhbachihi.spring_security.entity.User;
import jakarta.mail.MessagingException;

import java.util.List;

public interface AdminService {
    List<User> getUsers();
    User getUserByEmail(String email);
    String deleteUserByEmail(String email);
    String updateUserByEmail(String email, UserUpdateRequest request);
    List<String> getAllStudentsEmails();
    String sendEmail(SendMailRequest request) throws MessagingException;
}
