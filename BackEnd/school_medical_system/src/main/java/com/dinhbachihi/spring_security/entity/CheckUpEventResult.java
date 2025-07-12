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
    private String checkup;
    private String result = "Not yet";
    private String note;
    private LocalDate checkupDate;

    @ManyToOne
    @JoinColumn
    private Student student;

    @ManyToOne
    @JoinColumn
    private CheckUpEvent checkUpEvent;

    @ManyToOne
    @JoinColumn
    private User nurse;

    public CheckUpEventResult() {
    }
    public CheckUpEventResult(Long id, String checkup, String result, String note, LocalDate checkupDate) {
        this.id = id;
        this.checkup = checkup;
        this.result = result;
        this.note = note;
        this.checkupDate = checkupDate;
    }
}


