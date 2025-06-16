package com.dinhbachihi.spring_security.controller;

import com.dinhbachihi.spring_security.dto.request.*;
import com.dinhbachihi.spring_security.dto.response.ApiResponse;
import com.dinhbachihi.spring_security.entity.Classes;
import com.dinhbachihi.spring_security.entity.Student;
import com.dinhbachihi.spring_security.entity.User;
import com.dinhbachihi.spring_security.repository.StudentRepository;
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
    private final StudentRepository studentRepository;


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
    @GetMapping("/students/get-all-student")
    public ApiResponse<List<Student>> getStudents(){
        ApiResponse<List<Student>> response = new ApiResponse<>();
        response.setResult(adminService.getStudents());
        response.setMessage("get all students successfully");
        return response;
    }

    @GetMapping("/students/{studentId}")
    public ApiResponse<Student> getStudent(@PathVariable("studentId") String studentId){
        ApiResponse<Student> response = new ApiResponse<>();
        response.setResult(adminService.getStudentById(studentId));
        response.setMessage("get student successfully");
        return response;
    }

    @PostMapping("/students/add-student")
    public ApiResponse<Student> addStudent(@RequestBody StudentAddRequest request){
        ApiResponse<Student> response = new ApiResponse<>();
        response.setResult(adminService.addStudent(request));
        response.setMessage("add student successfully");
        return response;
    }

    @DeleteMapping("/students/{studentId}")
    public ApiResponse<String> deleteStudent(@PathVariable("studentId") String studentId){
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult(adminService.deleteStudentById(studentId));
        return response;
    }

    @PutMapping("/students/{studentId}")
    public ApiResponse<Student> updateStudent(@PathVariable("studentId") String studentId, @RequestBody StudentUpdateRequest request){
        ApiResponse<Student> response = new ApiResponse<>();
        response.setResult(adminService.updateStudentById(studentId, request));
        response.setMessage("update student successfully");
        return response;
    }
    @PostMapping("/classes/add")
    public ApiResponse<Classes> addClass(@RequestBody ClassesAddRequest request){
        ApiResponse<Classes> response = new ApiResponse<>();
        response.setResult(adminService.addClass(request));
        response.setMessage("add class successfully");
        return response;
    }

    @GetMapping("/classes/{id}")
    public ApiResponse<List<Student>> getAllStudentByClass(@PathVariable("id") String id){
        ApiResponse<List<Student>> response = new ApiResponse<>();
        response.setResult(adminService.getStudentsByClassId(id));
        return response;
    }
}
