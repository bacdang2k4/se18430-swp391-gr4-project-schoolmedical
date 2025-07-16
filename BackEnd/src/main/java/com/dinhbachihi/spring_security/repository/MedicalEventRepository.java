package com.dinhbachihi.spring_security.repository;

import com.dinhbachihi.spring_security.entity.MedicalEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MedicalEventRepository extends JpaRepository<MedicalEvent, Long> {

}
