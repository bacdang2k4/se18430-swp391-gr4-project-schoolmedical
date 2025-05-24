package com.dinhbachihi.spring_security.service.impl;

import com.dinhbachihi.spring_security.dto.request.SendMailRequest;
import com.dinhbachihi.spring_security.dto.request.UserUpdateRequest;
import com.dinhbachihi.spring_security.entity.User;
import com.dinhbachihi.spring_security.repository.UserRepository;
import com.dinhbachihi.spring_security.service.AdminService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
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

    public User getUserByEmail(String email){
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    @Transactional
    public String deleteUserByEmail(String email){
        userRepository.deleteByEmail(email);
        return "User deleted";
    }

    public String updateUserByEmail(String email, UserUpdateRequest request){
        User user = getUserByEmail(email);
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
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true);
        List<String > recipients = userRepository.findAll().stream().map(User::getEmail).collect(Collectors.toList());
        message.setTo(recipients.toArray(new String[0]));
        message.setSubject(request.getSubject());
        message.setText(request.getBody());
        File file = new File("C:\\Users\\Admin\\Downloads\\giao.lang_User Story Mapping-23.0810.xlsx");
        message.addAttachment(file.getName(), file);
        mailSender.send(mimeMessage);
        return "Sending email...";
    }
}
