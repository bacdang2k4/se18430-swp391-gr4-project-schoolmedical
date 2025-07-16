package com.dinhbachihi.spring_security.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

@Entity
@Data
public class CheckUpEventConsent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @CreationTimestamp
    private LocalDate sendDate;
    private String consent = "pending";
    @ManyToOne
    @JoinColumn(name="student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name="checkUp")
    private CheckUpEvent event;

    @ManyToOne
    @JoinColumn(name="parent")
    private User parent;
}
