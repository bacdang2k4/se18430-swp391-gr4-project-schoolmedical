package com.dinhbachihi.spring_security.repository;

import com.dinhbachihi.spring_security.entity.MedicineSent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineSentRepository extends JpaRepository<MedicineSent, Long> {
}
