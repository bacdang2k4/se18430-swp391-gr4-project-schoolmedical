package com.dinhbachihi.spring_security.repository;

import com.dinhbachihi.spring_security.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckUpEventResultRepository extends JpaRepository<CheckUpEventResult, Long> {
    List<VaccinationResult> findByStudentAndEvent(Student student, CheckUpEvent event);

}
