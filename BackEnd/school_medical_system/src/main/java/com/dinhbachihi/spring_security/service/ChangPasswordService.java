package com.dinhbachihi.spring_security.service;

public interface ChangPasswordService {
    String changePassword(String oldPassword, String newPassword, String confirmPassword);
}
