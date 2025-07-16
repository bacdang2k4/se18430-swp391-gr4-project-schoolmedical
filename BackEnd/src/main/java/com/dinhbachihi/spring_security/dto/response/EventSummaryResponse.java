package com.dinhbachihi.spring_security.dto.response;

import lombok.Data;

import java.time.LocalDate;

@Data
public class EventSummaryResponse {
    private Long id;
    private String name; // ví dụ Tim lần 1 , lần 2
    private String status;  //lên lịch , hoàn thành,  đang tiến hành
    private LocalDate eventDate;
}
