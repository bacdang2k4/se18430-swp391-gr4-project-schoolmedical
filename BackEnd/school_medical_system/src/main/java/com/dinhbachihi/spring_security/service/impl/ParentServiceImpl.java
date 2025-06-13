package com.dinhbachihi.spring_security.service.impl;

import com.dinhbachihi.spring_security.entity.Student;
import com.dinhbachihi.spring_security.entity.User;
import com.dinhbachihi.spring_security.repository.UserRepository;
import com.dinhbachihi.spring_security.service.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class ParentServiceImpl implements ParentService {

    @Autowired // Inject UserRepository để tránh null
    private UserRepository userRepository;

    public List<Student> getListChild(String id) {
        User user = userRepository.findById(id).orElseThrow(() ->
                new RuntimeException("User not found with ID: " + id)
        ); // Kiểm tra nếu User không tồn tại

        return user.getStudents(); // Trả về danh sách sinh viên
    }
}

