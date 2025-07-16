package com.dinhbachihi.spring_security.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.util.List;

@Data
@Entity

public class MedicalEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long medicalEventId;
    private String medicalEventName;
    private String medicalEventDescription;
    @CreationTimestamp
    private String medicalEventTime;
    private String type;

    @ManyToOne

    @JoinColumn(name="student_id")
    @JsonBackReference
    private Student student;

    @ManyToOne
    @JoinColumn(name="handle_by")
    private  User nurse;

    @OneToMany(mappedBy = "medicalEvent", cascade = CascadeType.ALL)
    private List<UsedMedicine> usedMedicines;



}
