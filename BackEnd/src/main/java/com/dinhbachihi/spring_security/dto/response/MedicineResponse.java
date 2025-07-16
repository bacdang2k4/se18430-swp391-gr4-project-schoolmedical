package com.dinhbachihi.spring_security.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedicineResponse {
    Long id;
    private String name;
    private int quantity;
    private String type;
    private String unit;
}
