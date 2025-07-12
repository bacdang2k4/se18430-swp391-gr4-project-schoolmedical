package com.dinhbachihi.spring_security.repository;

import com.dinhbachihi.spring_security.entity.CheckUpEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CheckUpEventRepository extends JpaRepository<CheckUpEvent, Long> {
}
