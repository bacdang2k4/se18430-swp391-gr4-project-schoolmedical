package com.dinhbachihi.spring_security.repository;

import com.dinhbachihi.spring_security.entity.Event;
import com.dinhbachihi.spring_security.entity.Student;
import com.dinhbachihi.spring_security.entity.VaccinationConsent;
import com.dinhbachihi.spring_security.entity.VaccinationResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VaccinationConsentRepository extends JpaRepository<VaccinationConsent, Long> {
    List<VaccinationConsent> findByConsent(String consent);
    List<VaccinationConsent> findByConsentAndEvent(String consent, Event event);
    List<VaccinationConsent> findByStudentAndEvent(Student student, Event event);
}
