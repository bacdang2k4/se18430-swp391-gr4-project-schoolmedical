package com.dinhbachihi.spring_security.repository;

import com.dinhbachihi.spring_security.entity.CheckUpEventConsent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckUpEventConsentRepository extends JpaRepository<CheckUpEventConsent, Long> {
    List<CheckUpEventConsent> findByConsent(String consent);
}
