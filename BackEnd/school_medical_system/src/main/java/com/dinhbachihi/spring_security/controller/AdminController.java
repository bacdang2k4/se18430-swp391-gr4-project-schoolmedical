package com.dinhbachihi.spring_security.controller;

import com.dinhbachihi.spring_security.dto.request.SendMailRequest;
import com.dinhbachihi.spring_security.dto.request.UserUpdateRequest;
import com.dinhbachihi.spring_security.dto.response.ApiResponse;
import com.dinhbachihi.spring_security.entity.User;
import com.dinhbachihi.spring_security.service.AdminService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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

    @GetMapping("/users/{userId}")
    public ApiResponse<User> user(@PathVariable("userId") String userId){
        ApiResponse<User> response = new ApiResponse<>();
        response.setResult(adminService.getUserById(userId));
        return response;
    }

    @DeleteMapping("/users/{userId}")
    public ApiResponse<String> deleteUser(@PathVariable("userId") String userId){
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult(adminService.deleteUserById(userId));
        return response;
    }

    @PutMapping("/users/{userId}")
    public ApiResponse<String> updateUser(@PathVariable("userId") String userId
            ,@Valid @RequestBody UserUpdateRequest request){
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult(adminService.updateUserById(userId, request));
        return response;
    }
    @GetMapping("list-mail")
    public ApiResponse<List<String>> listMail(){
        ApiResponse<List<String>> response = new ApiResponse<>();
        response.setResult(adminService.getAllStudentsEmails());
        return response;
    }
    @PostMapping("send-mail")
    public ApiResponse<String> sendMail(@RequestBody SendMailRequest request) throws MessagingException {
        ApiResponse<String> response = new ApiResponse<>();
        response.setMessage(adminService.sendEmail(request));
        return response;
    }
}
