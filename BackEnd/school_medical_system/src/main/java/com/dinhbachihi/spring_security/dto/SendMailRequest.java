package com.dinhbachihi.spring_security.dto;

import lombok.Data;

import java.util.List;

@Data
public class SendMailRequest {
    String subject;
    String body;
}
