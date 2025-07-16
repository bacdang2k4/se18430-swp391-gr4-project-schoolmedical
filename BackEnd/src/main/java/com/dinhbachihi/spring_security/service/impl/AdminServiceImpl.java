package com.dinhbachihi.spring_security.service.impl;

import com.dinhbachihi.spring_security.dto.request.*;
import com.dinhbachihi.spring_security.entity.Classes;
import com.dinhbachihi.spring_security.entity.Student;
import com.dinhbachihi.spring_security.entity.User;
import com.dinhbachihi.spring_security.exception.AppException;
import com.dinhbachihi.spring_security.exception.ErrorCode;
import com.dinhbachihi.spring_security.repository.ClassesRepository;
import com.dinhbachihi.spring_security.repository.StudentRepository;
import com.dinhbachihi.spring_security.repository.UserRepository;
import com.dinhbachihi.spring_security.service.AdminService;
import com.dinhbachihi.spring_security.service.HealthRecordService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    @Autowired
    private final JavaMailSender mailSender;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final ClassesRepository classesRepository;
    private final HealthRecordService healthRecordService;

    public List<User> getUsers() {
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

    @Override
    public List<Student> getStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student getStudentById(String studentId) {
        return studentRepository.findById(studentId).orElseThrow(() -> new AppException(ErrorCode.STUDENT_NOT_FOUND));
    }

    @Override
    public Student addStudent(StudentAddRequest request) {
        if(studentRepository.existsByStudentId(request.getStudentId())) {
            throw new AppException(ErrorCode.STUDENT_ALREADY_EXISTS);
        }
        User user = userRepository.getById(request.getParentID());
        Classes classes = classesRepository.findClassesById(request.getClassID());
        if(classes==null){
            throw new AppException(ErrorCode.CLASS_NOT_FOUND);
        }
        Student student = Student.builder()
                .studentId(request.getStudentId())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .gender(request.getGender())
                .dateOfBirth(request.getDateOfBirth())
                .classes(classes)
                .parent(user)
                .build();
        addStudentToClasses(student, classes);
        studentRepository.save(student);
        healthRecordService.createHealthRecord(student.getStudentId());
        return student;
    }

    @Override
    public String deleteStudentById(String studentId) {
        studentRepository.findById(studentId).orElseThrow(() -> new AppException(ErrorCode.STUDENT_NOT_FOUND));
        studentRepository.deleteById(studentId);
        return "student deleted";
    }

    @Override
    public Student updateStudentById(String studentId, StudentUpdateRequest request) {
        Student student = getStudentById(studentId);
        student.setFirstName(request.getFirstName());
        student.setLastName(request.getLastName());
        student.setGender(request.getGender());
        student.setDateOfBirth(request.getDateOfBirth());
        return studentRepository.save(student);
    }
    public Classes addClass(ClassesAddRequest request) {
        if(classesRepository.existsById(request.getId())){
            throw new AppException(ErrorCode.ClASS_ALREADY_EXISTS);
        }
        Classes classes = new Classes();
        classes.setId(request.getId());
        classes.setName(request.getName());
        return classesRepository.save(classes);
    }
    public void addStudentToClasses(Student student, Classes classes) {
        if (classes.getStudentList() == null) {
            classes.setStudentList(new ArrayList<>());
        }
        classes.getStudentList().add(student);
        classesRepository.save(classes);
    }
    public List<Student> getStudentsByClassId(String classId) {
       Classes classes = classesRepository.findClassesById(classId);
       List<Student> students = classes.getStudentList();
        return students;
    }




}
