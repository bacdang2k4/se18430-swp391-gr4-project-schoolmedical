package com.dinhbachihi.spring_security.dto.request;

import lombok.Data;

@Data
public class MedicineSentRequest {
    private String medicineName;
    private String usageInstructions;
    private String note;
}
