package com.dinhbachihi.spring_security.dto.request;

import com.dinhbachihi.spring_security.entity.User;
import jakarta.persistence.Column;
import lombok.Data;

@Data
public class CreateBlogRequest {
    private String title;
    private String content;
}
