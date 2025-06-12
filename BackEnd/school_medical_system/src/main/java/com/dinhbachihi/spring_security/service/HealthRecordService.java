package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.request.CreateHealthRecordRequest;
import com.dinhbachihi.spring_security.dto.request.UpdateHealthRecordRequest;
import com.dinhbachihi.spring_security.entity.HealthRecord;

public interface HealthRecordService {
    HealthRecord createHealthRecord(CreateHealthRecordRequest request);
    HealthRecord updateHealthRecord(UpdateHealthRecordRequest request);
}
