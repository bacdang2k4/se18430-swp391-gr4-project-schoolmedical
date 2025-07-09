package com.dinhbachihi.spring_security.repository;

import com.dinhbachihi.spring_security.entity.MedicineSent;
import com.dinhbachihi.spring_security.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicineSentRepository extends JpaRepository<MedicineSent, Long> {
    List<MedicineSent> findByParent(User parent);
}
