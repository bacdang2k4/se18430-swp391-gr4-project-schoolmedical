package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.request.CreateHealthRecordRequest;
import com.dinhbachihi.spring_security.dto.request.UpdateHealthRecordRequest;
import com.dinhbachihi.spring_security.entity.HealthRecord;
import com.dinhbachihi.spring_security.entity.Student;

import java.util.List;

public interface HealthRecordService {
    HealthRecord createHealthRecord(String id);
    HealthRecord updateHealthRecord(UpdateHealthRecordRequest request,Long id);
    HealthRecord getHealthRecord(Long id);
    public List<Student> getAllHealthRecord();
}
