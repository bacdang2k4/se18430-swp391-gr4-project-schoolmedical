package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.request.CreateHealthRecordRequest;
import com.dinhbachihi.spring_security.dto.request.UpdateHealthRecordRequest;
import com.dinhbachihi.spring_security.entity.HealthRecord;

public interface HealthRecordService {
    HealthRecord createHealthRecord(String id);
    HealthRecord updateHealthRecord(UpdateHealthRecordRequest request,Long id);
    HealthRecord getHealthRecord(Long id);
}
