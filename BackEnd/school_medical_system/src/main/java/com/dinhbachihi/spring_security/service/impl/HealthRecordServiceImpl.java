package com.dinhbachihi.spring_security.service.impl;

import com.dinhbachihi.spring_security.dto.request.CreateHealthRecordRequest;
import com.dinhbachihi.spring_security.dto.request.UpdateHealthRecordRequest;
import com.dinhbachihi.spring_security.entity.HealthRecord;
import com.dinhbachihi.spring_security.entity.Student;
import com.dinhbachihi.spring_security.exception.AppException;
import com.dinhbachihi.spring_security.exception.ErrorCode;
import com.dinhbachihi.spring_security.repository.HealthRecordRepository;
import com.dinhbachihi.spring_security.repository.StudentRepository;
import com.dinhbachihi.spring_security.service.HealthRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HealthRecordServiceImpl implements HealthRecordService {
    private final HealthRecordRepository healthRecordRepository;
    private final StudentRepository studentRepository;

    @Override
    public HealthRecord createHealthRecord(CreateHealthRecordRequest request) {
        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new AppException(ErrorCode.STUDENT_NOT_FOUND));
        if(student.getHealthRecord() != null) {
            throw new AppException(ErrorCode.HEALTH_RECORD_ALREADY_EXISTS);
        }

        HealthRecord record = HealthRecord.builder()
                .allergy(request.getAllergy())
                .chronic_disease(request.getChronic_disease())
                .vision(request.getVision())
                .hearing(request.getHearing())
                .medical_history(request.getMedical_history())
                .student(student)
                .build();

        return healthRecordRepository.save(record);
    }

    public HealthRecord updateHealthRecord(UpdateHealthRecordRequest request) {
        HealthRecord existingRecord = healthRecordRepository.findById(request.getRecordId())
                .orElseThrow(() -> new AppException(ErrorCode.HEALTH_RECORD_NOT_FOUND));

        // Cập nhật các trường nếu có
        existingRecord.setAllergy(request.getAllergy());
        existingRecord.setChronic_disease(request.getChronic_disease());
        existingRecord.setVision(request.getVision());
        existingRecord.setHearing(request.getHearing());
        existingRecord.setMedical_history(request.getMedical_history());

        return healthRecordRepository.save(existingRecord);
    }
}
