package com.dinhbachihi.spring_security.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
@Data
@Entity
public class CheckUpEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private LocalDate eventDate;
    private String description;
    private String status ="setup";

    @OneToMany(mappedBy = "checkUp", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<VaccinationConsent> forms = null;

    @OneToMany(mappedBy = "checkUp", cascade = CascadeType.ALL)
    private List<VaccinationResult> results = null;
}
