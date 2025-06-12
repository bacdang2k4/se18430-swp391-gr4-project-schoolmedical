package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.request.StudentAddRequest;
import com.dinhbachihi.spring_security.dto.request.SendMailRequest;
import com.dinhbachihi.spring_security.dto.request.StudentUpdateRequest;
import com.dinhbachihi.spring_security.dto.request.UserUpdateRequest;
import com.dinhbachihi.spring_security.entity.Student;
import com.dinhbachihi.spring_security.entity.User;
import jakarta.mail.MessagingException;

import java.util.List;

public interface AdminService {
    List<User> getUsers();
    User getUserById(String id);
    String deleteUserById(String id);
    String updateUserById(String id, UserUpdateRequest request);
    List<String> getAllStudentsEmails();
    String sendEmail(SendMailRequest request) throws MessagingException;
    List<Student> getStudents();
    Student getStudentById(String studentId);
    Student addStudent(StudentAddRequest request);
    String deleteStudentById(String studentId);
    Student updateStudentById(String studentId, StudentUpdateRequest request);
}
