package com.dinhbachihi.spring_security.repository;

import com.dinhbachihi.spring_security.entity.Classes;
import com.dinhbachihi.spring_security.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassesRepository extends JpaRepository<Classes, String> {
    boolean existsById(String id);
    Classes findClassesById(String id);
}
