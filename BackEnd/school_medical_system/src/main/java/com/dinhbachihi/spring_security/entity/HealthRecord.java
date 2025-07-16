package com.dinhbachihi.spring_security.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HealthRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordId;

    private String allergy;
    private String chronic_disease;
    private String vision;
    private String hearing;
    private Double height;
    private Double weight;
    private String medical_history;

    @OneToOne
    @JoinColumn(name = "student_id", nullable = false, unique = true)
    @JsonBackReference//Để không trùng lặp các thông tin của bảng khi gọi
    private Student student;
}
