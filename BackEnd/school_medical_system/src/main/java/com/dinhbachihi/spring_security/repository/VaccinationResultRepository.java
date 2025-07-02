package com.dinhbachihi.spring_security.repository;

import com.dinhbachihi.spring_security.entity.VaccinationResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VaccinationResultRepository extends JpaRepository<VaccinationResult, Long> {
}
