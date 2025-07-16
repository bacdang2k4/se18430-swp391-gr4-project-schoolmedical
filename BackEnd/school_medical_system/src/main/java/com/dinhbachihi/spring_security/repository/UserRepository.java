package com.dinhbachihi.spring_security.repository;

import com.dinhbachihi.spring_security.entity.Role;
import com.dinhbachihi.spring_security.entity.Student;
import com.dinhbachihi.spring_security.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    User findByRole(Role role);
    void deleteById(String id);
    List<User> findAllByRole(Role role);
    long countByEnabled(boolean enabled);
    long countByRole(Role role);
}
