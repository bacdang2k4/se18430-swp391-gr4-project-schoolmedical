package com.dinhbachihi.spring_security.dto.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ViewBlogRequest {
    private String title;
    private String content;
    private LocalDateTime updatedAt;
}
