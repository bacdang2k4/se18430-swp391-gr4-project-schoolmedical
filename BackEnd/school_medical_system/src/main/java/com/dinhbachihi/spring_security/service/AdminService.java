package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.request.SendMailRequest;
import com.dinhbachihi.spring_security.dto.request.UserUpdateRequest;
import com.dinhbachihi.spring_security.entity.User;
import jakarta.mail.MessagingException;

import java.util.List;

public interface AdminService {
    List<User> getUsers();
    User getUserById(String id);
    String deleteUserById(String id);
    String updateUserById(String id, UserUpdateRequest request);
    List<String> getAllStudentsEmails();
    String sendEmail(SendMailRequest request) throws MessagingException;
}
