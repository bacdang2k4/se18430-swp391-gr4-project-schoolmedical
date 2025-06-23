package com.dinhbachihi.spring_security.dto.request;

import lombok.Data;

@Data
public class UsedMedicineRequest {
    private Long medicineId;
    private int quantityUsed;
}
