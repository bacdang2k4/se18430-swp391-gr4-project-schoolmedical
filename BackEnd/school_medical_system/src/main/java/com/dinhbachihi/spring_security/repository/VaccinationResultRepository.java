package com.dinhbachihi.spring_security.repository;

import com.dinhbachihi.spring_security.entity.Event;
import com.dinhbachihi.spring_security.entity.Student;
import com.dinhbachihi.spring_security.entity.VaccinationResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VaccinationResultRepository extends JpaRepository<VaccinationResult, Long> {
    List<VaccinationResult> findByEvent(Event event);
    List<VaccinationResult> findByStudentAndEvent(Student student, Event event);
}
