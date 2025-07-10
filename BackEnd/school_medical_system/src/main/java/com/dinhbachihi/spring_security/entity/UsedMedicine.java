package com.dinhbachihi.spring_security.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "used_medicine")
public class UsedMedicine {

    @EmbeddedId
    private UsedMedicineKey id = new UsedMedicineKey();

    @ManyToOne
    @MapsId("medicalEventId")
    @JoinColumn(name = "medical_event_id")
    @JsonBackReference
    private MedicalEvent medicalEvent;

    @ManyToOne
    @MapsId("medicineId")
    @JoinColumn(name = "medicine_id")

    private Medicine medicine;

    private int quantityUsed;
}
