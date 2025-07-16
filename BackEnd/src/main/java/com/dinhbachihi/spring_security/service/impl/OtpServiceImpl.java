package com.dinhbachihi.spring_security.service.impl;

import com.dinhbachihi.spring_security.entity.User;
import com.dinhbachihi.spring_security.repository.UserRepository;
import com.dinhbachihi.spring_security.service.EmailService;
import com.dinhbachihi.spring_security.service.OtpService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class OtpServiceImpl implements OtpService {
    private final UserRepository userRepository;
    private final EmailService emailService;

    public OtpServiceImpl(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    @Override
    public void sendOtp(User user) {
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        user.setOtpCode(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(10));
        userRepository.save(user);
        emailService.sendEmail(user.getEmail(), "Kích hoạt tài khoản", "Mã OTP của bạn là: " + otp);
    }
}
