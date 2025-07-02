package com.dinhbachihi.spring_security.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

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

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<VaccinationConsent> forms = null;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<VaccinationResult> results = null;
}

