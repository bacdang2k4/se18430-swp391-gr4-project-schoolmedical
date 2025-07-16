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

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<CheckUpEventConsent> forms = null;


    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<CheckUpEventResult> list = null;


}
