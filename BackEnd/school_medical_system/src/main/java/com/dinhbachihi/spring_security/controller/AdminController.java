package com.dinhbachihi.spring_security.controller;

import com.dinhbachihi.spring_security.dto.SendMailRequest;
import com.dinhbachihi.spring_security.dto.UpdateRequest;
import com.dinhbachihi.spring_security.entity.User;
import com.dinhbachihi.spring_security.service.AdminService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @GetMapping
    public ResponseEntity<String> welcome(){
        return ResponseEntity.ok("Hello Admin");
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> users(){
        return ResponseEntity.ok(adminService.getUsers());
    }

    @GetMapping("/users/{userEmail}")
    public ResponseEntity<User> user(@PathVariable("userEmail") String userEmail){
        return ResponseEntity.ok(adminService.getUserByEmail(userEmail));
    }

    @DeleteMapping("/users/{userEmail}")
    public ResponseEntity<String> deleteUser(@PathVariable("userEmail") String userEmail){
        return ResponseEntity.ok(adminService.deleteUserByEmail(userEmail));
    }
    @PutMapping("/users/{userEmail}")
    public ResponseEntity<String> updateUser(@PathVariable("userEmail") String userEmail, @RequestBody UpdateRequest request){
        return ResponseEntity.ok(adminService.updateUserByEmail(request,userEmail));
    }
    @GetMapping("listmail")
    public ResponseEntity<List<String>> listMail(){
        return ResponseEntity.ok(adminService.getAllStudentsEmails());
    }
    @PostMapping("sendmail")
    public ResponseEntity<String> sendMail(@RequestBody SendMailRequest request) throws MessagingException {
        return ResponseEntity.ok(adminService.sendEmail(request));
    }
}
