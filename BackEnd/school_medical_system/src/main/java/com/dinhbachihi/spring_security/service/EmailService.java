package com.dinhbachihi.spring_security.service;

public interface EmailService {
    void sendEmail(String to, String subject, String body);
}
