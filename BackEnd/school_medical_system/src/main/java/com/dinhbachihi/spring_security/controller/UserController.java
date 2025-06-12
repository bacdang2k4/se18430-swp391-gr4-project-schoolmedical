package com.dinhbachihi.spring_security.controller;

import com.dinhbachihi.spring_security.dto.request.ChangPasswordRequest;
import com.dinhbachihi.spring_security.service.ChangPasswordService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dinhbachihi.spring_security.dto.request.UserUpdateRequest;
import com.dinhbachihi.spring_security.dto.response.ApiResponse;
import com.dinhbachihi.spring_security.entity.User;
import com.dinhbachihi.spring_security.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final ChangPasswordService changPasswordService;

    @GetMapping("/profile")
    public ApiResponse<User> getProfile() {
        ApiResponse<User> response = new ApiResponse<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // Get the authenticated user's email
        User user = userService.getUserProfileByEmail(email);
        response.setResult(user);
        response.setMessage(email + " profile retrieved successfully");
        return response;
    }

    @PutMapping("/profile/update")
    public ApiResponse<User> updateProfile(@Valid @RequestBody UserUpdateRequest request) {
        ApiResponse<User> response = new ApiResponse<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // Get the authenticated user's email
        User updatedUser = userService.updateUserProfile(email, request);
        response.setResult(updatedUser);
        response.setMessage("Profile updated successfully for " + email);
        return response;
    }

    @PutMapping("/profile/change-password")
    public ApiResponse<String> changePassword(@RequestBody ChangPasswordRequest request) {
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult(changPasswordService.changePassword(request.getOldPassword(), request.getNewPassword(), request.getConfirmPassword()));
        return response;
    }
}
