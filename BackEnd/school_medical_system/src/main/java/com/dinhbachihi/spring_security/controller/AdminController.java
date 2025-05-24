package com.dinhbachihi.spring_security.controller;

import com.dinhbachihi.spring_security.dto.request.SendMailRequest;
import com.dinhbachihi.spring_security.dto.request.UserUpdateRequest;
import com.dinhbachihi.spring_security.dto.response.ApiResponse;
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
    public ApiResponse<String> welcome(){
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult("Hello Admin");
        return response;
    }

    @GetMapping("/users")
    public ApiResponse<List<User>> users(){
        ApiResponse<List<User>> response = new ApiResponse<>();
        response.setResult(adminService.getUsers());
        return response;
    }

    @GetMapping("/users/{userEmail}")
    public ApiResponse<User> user(@PathVariable("userEmail") String userEmail){
        ApiResponse<User> response = new ApiResponse<>();
        response.setResult(adminService.getUserByEmail(userEmail));
        return response;
    }

    @DeleteMapping("/users/{userEmail}")
    public ApiResponse<String> deleteUser(@PathVariable("userEmail") String userEmail){
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult(adminService.deleteUserByEmail(userEmail));
        return response;
    }

    @PutMapping("/users/{userEmail}")
    public ApiResponse<String> updateUser(@PathVariable("userEmail") String userEmail
            , @RequestBody UserUpdateRequest request){
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult(adminService.updateUserByEmail(userEmail, request));
        return response;
    }
    @GetMapping("listmail")
    public ApiResponse<List<String>> listMail(){
        ApiResponse<List<String>> response = new ApiResponse<>();
        response.setResult(adminService.getAllStudentsEmails());
        return response;
    }
    @PostMapping("sendmail")
    public ApiResponse<String> sendMail(@RequestBody SendMailRequest request) throws MessagingException {
        ApiResponse<String> response = new ApiResponse<>();
        response.setMessage(adminService.sendEmail(request));
        return response;
    }
}
