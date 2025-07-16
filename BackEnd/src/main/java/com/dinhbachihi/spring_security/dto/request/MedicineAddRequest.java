package com.dinhbachihi.spring_security.dto.request;

import lombok.Data;

@Data
public class MedicineAddRequest {
    private String name;
    private String type;
    private int quantity;
    private String unit;
}
