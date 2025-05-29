package com.dinhbachihi.spring_security.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/api/v1/parent")
@RequiredArgsConstructor
public class ParentController {
    @GetMapping
    public ResponseEntity<String> welcome(){
        return ResponseEntity.ok("Hello Parent");
    }
}
