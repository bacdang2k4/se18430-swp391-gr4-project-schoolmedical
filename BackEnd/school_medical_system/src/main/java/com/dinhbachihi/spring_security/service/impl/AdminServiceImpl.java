package com.dinhbachihi.spring_security.service.impl;

import com.dinhbachihi.spring_security.dto.request.SendMailRequest;
import com.dinhbachihi.spring_security.dto.request.UserUpdateRequest;
import com.dinhbachihi.spring_security.entity.User;
import com.dinhbachihi.spring_security.exception.AppException;
import com.dinhbachihi.spring_security.exception.ErrorCode;
import com.dinhbachihi.spring_security.repository.UserRepository;
import com.dinhbachihi.spring_security.service.AdminService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    @Autowired
    private final JavaMailSender mailSender;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUserById(String id){
        return userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }
    @Transactional
    public String deleteUserById(String id){
        userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        userRepository.deleteById(id);
        return "User deleted";
    }

    public String updateUserById(String id, UserUpdateRequest request){
        User user = getUserById(id);
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
        return "User updated";
    }
    public List<String> getAllStudentsEmails(){
        return userRepository.findAll().stream().map(User::getEmail).collect(Collectors.toList());
    }
    @Override
    public String sendEmail(SendMailRequest request) throws MessagingException {
        List<User> users = userRepository.findAll();

        for (User user : users) {
            if ("admin@gmail.com".equalsIgnoreCase(user.getEmail())) {
                continue; // Bỏ qua admin
            }

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true);

            message.setTo(user.getEmail());
            message.setSubject(request.getSubject());

            String body = "Xin chào " + user.getFirstName() + ",\n\n" +
                    "Username của bạn là: " + user.getEmail() + "\n\n" +
                    "Mật khẩu mặc định của bạn là: abc12345678\n\n" +
                    "Trân trọng.";
            message.setText(body);

            mailSender.send(mimeMessage);
        }

        return "Đã gửi email cho tất cả người dùng.";
    }

}
