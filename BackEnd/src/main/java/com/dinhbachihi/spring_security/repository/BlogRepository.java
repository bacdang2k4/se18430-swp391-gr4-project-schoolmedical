package com.dinhbachihi.spring_security.repository;

import com.dinhbachihi.spring_security.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
}
