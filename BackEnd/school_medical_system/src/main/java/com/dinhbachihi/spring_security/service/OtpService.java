package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.entity.User;

public interface OtpService {
    void sendOtp(User user);
}
