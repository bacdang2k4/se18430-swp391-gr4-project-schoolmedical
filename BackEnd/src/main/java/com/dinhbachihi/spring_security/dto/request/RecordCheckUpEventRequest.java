package com.dinhbachihi.spring_security.dto.request;


import lombok.Data;

import java.time.LocalDate;

@Data
public class RecordCheckUpEventRequest {
    private String note;
    private Double height;
    private Double weight;
    private String vision;
    private String hearing;
}
