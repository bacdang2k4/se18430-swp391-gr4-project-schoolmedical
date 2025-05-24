package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.UpdateRequest;
import com.dinhbachihi.spring_security.entity.User;

import java.util.List;

public interface AdminService {
    List<User> getUsers();
    User getUserByEmail(String email);
    String deleteUserByEmail(String email);
    String updateUserByEmail(UpdateRequest request, String email);
    List<String> getAllStudentsEmails();
}
