package com.dinhbachihi.spring_security.dto.request;

import lombok.Data;

@Data
public class UpdateHealthRecordRequest {
    private Long recordId;

    private String allergy;
    private String chronic_disease;
    private String vision;
    private String hearing;
    private String medical_history;
}
