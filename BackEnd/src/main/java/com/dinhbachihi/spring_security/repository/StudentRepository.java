package com.dinhbachihi.spring_security.repository;

import com.dinhbachihi.spring_security.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {
    boolean existsByStudentId(String studentId);
}
