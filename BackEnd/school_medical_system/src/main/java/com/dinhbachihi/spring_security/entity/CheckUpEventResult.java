package com.dinhbachihi.spring_security.entity;

import jakarta.persistence.*;
import lombok.Data;


import java.time.LocalDate;


@Entity
@Data
public class CheckUpEventResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String result = "Not yet";
    private String note;
    private String height;
    private String weight;
    private String vision;
    private String hearing;
    private LocalDate checkupDate;

    @ManyToOne
    @JoinColumn
    private Student student;

    @ManyToOne
    @JoinColumn
    private CheckUpEvent event;

    @ManyToOne
    @JoinColumn
    private User nurse;

    public CheckUpEventResult() {
    }

    public CheckUpEventResult(Long id, String result, String note, String height, String weight, String vision, String hearing, LocalDate checkupDate) {
        this.id = id;
        this.result = result;
        this.note = note;
        this.height = height;
        this.weight = weight;
        this.vision = vision;
        this.hearing = hearing;
        this.checkupDate = checkupDate;
    }
}


