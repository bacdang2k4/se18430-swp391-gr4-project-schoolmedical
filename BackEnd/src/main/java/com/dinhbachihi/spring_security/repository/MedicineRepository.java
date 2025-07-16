package com.dinhbachihi.spring_security.repository;

import com.dinhbachihi.spring_security.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {
}
