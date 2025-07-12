package com.dinhbachihi.spring_security.dto.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateCheckUpEventRequest {
    private String name;
    private String type;
    private LocalDate eventDate;
    private String description;
}
