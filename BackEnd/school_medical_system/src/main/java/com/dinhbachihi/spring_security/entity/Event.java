package com.dinhbachihi.spring_security.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // Tên sự kiện: "Tiêm vắc xin DPT", "Khám sức khỏe định kỳ"
    private String type; // Ví dụ: "TIEM_CHUNG", "KHAM_SUC_KHOE", "TU_VAN" (dùng Enum nếu muốn chặt chẽ hơn)
    private LocalDate eventDate;
    private String description;

}

