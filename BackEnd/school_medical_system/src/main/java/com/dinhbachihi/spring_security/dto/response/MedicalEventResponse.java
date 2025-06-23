package com.dinhbachihi.spring_security.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class MedicalEventResponse {
    private Long medicalEventId;
    private String medicalEventName;
    private String medicalEventDescription;
    private String medicalEventTime;
    private String type;
    private String student;
    private String nurse;
    private List<UsedMedicineDTO> medicineList;


}


