package com.dinhbachihi.spring_security.dto.request;

import lombok.Data;

@Data
public class CreateHealthRecordRequest {
    private String allergy;
    private String chronic_disease;
    private String vision;
    private String hearing;
    private String height;
    private String weight;
    private String medical_history;

}
