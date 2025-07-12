package com.dinhbachihi.spring_security.dto.request;


import lombok.Data;

import java.time.LocalDate;

@Data
public class RecordCheckUpEventRequest {
    private String studentId;
    private String result;
    private String status;
    private String note;
}
