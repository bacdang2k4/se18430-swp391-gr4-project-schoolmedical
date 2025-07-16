package com.dinhbachihi.spring_security.repository;

import com.dinhbachihi.spring_security.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    int countByType(String type);
    @Query("SELECT COUNT(e) FROM Event e WHERE e.type = :type AND e.eventDate >= CURRENT_DATE")
    int countInProgressByType(@Param("type") String type);
}
