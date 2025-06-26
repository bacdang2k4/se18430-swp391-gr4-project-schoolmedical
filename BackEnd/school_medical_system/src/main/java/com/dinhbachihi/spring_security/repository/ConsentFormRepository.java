package com.dinhbachihi.spring_security.repository;

import com.dinhbachihi.spring_security.entity.ConsentForm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsentFormRepository extends JpaRepository<ConsentForm, Long> {
}
