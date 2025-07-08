package com.dinhbachihi.spring_security.dto.response;


import lombok.Data;

import java.util.List;

@Data
public class EventDashboardResponse {
    private int totalEvents;
    private int inProgress;
    private int completed;
    private int rate; // Tỷ lệ hoàn thành / hoặc tùy ý bạn đặt nghĩa
    private int studentCount; // Cho trường hợp cần (có thể null với loại khác)
    private String type;
    private List<EventSummaryResponse> events;// VD: "TIEM_CHUNG", "KHAM_SUC_KHOE"
}
