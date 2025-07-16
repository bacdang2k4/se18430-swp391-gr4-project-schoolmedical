package com.dinhbachihi.spring_security.dto.response;

import lombok.Data;

@Data
public class UsedMedicineDTO {
    private String name;
    private int quantityUsed;
}