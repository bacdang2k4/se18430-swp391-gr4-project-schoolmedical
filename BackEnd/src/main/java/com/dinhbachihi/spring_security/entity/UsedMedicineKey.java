package com.dinhbachihi.spring_security.entity;

import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Embeddable
@Data
public class UsedMedicineKey implements Serializable {
    private Long medicalEventId;
    private Long medicineId;
}

