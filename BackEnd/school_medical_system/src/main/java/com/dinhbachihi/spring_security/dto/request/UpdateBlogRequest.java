package com.dinhbachihi.spring_security.dto.request;

import lombok.Data;

@Data
public class UpdateBlogRequest {
    private String title;
    private String content;
}
