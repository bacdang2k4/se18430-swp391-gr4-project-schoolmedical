package com.dinhbachihi.spring_security.repository;

import com.dinhbachihi.spring_security.entity.UsedMedicine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsedMedicineRepository extends JpaRepository<UsedMedicine, Long> {
}
