package com.dinhbachihi.spring_security.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class VaccinationResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String vaccine;
    private String result = "Not yet";
    private String note;
    private LocalDate vaccinationDate;
    @ManyToOne
    @JoinColumn
    @JsonBackReference
    private Student student;

    @ManyToOne
    @JoinColumn
    private Event event;

    @ManyToOne
    @JoinColumn
    private User nurse;

    public VaccinationResult(Long id, String vaccine, String result, String note, LocalDate vaccinationDate) {
        this.id = id;
        this.vaccine = vaccine;
        this.result = result;
        this.note = note;
        this.vaccinationDate = vaccinationDate;
    }

    public VaccinationResult() {
    }
}
