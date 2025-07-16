package com.dinhbachihi.spring_security.dto.request;


import lombok.Data;

import java.util.List;

@Data
public class MedicalEventRequest {
    private String medicalEventName;
    private String medicalEventDescription;
    private String type;
    private List<UsedMedicineRequest> medicineList;


}
