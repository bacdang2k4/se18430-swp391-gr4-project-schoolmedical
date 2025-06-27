package com.dinhbachihi.spring_security.repository;

import com.dinhbachihi.spring_security.entity.ConsentForm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConsentFormRepository extends JpaRepository<ConsentForm, Long> {
    List<ConsentForm> findByConsent(String consent);
}
