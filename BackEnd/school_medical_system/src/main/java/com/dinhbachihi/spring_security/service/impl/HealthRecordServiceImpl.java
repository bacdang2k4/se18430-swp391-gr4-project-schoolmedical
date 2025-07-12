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

import java.util.List;

@Service
@RequiredArgsConstructor
public class HealthRecordServiceImpl implements HealthRecordService {
    private final HealthRecordRepository healthRecordRepository;
    private final StudentRepository studentRepository;

    @Override
    public HealthRecord createHealthRecord(String id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.STUDENT_NOT_FOUND));
        HealthRecord record = HealthRecord.builder()

                .student(student)
                .build();

        return healthRecordRepository.save(record);
    }

    public HealthRecord updateHealthRecord(UpdateHealthRecordRequest request , Long id) {
        HealthRecord existingRecord = healthRecordRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.HEALTH_RECORD_NOT_FOUND));

        // Cập nhật các trường nếu có
        existingRecord.setAllergy(request.getAllergy());
        existingRecord.setChronic_disease(request.getChronic_disease());
        existingRecord.setVision(request.getVision());
        existingRecord.setHearing(request.getHearing());
        existingRecord.setWeight(request.getWeight());
        existingRecord.setHeight(request.getHeight());
        existingRecord.setMedical_history(request.getMedical_history());

        return healthRecordRepository.save(existingRecord);
    }

    public HealthRecord getHealthRecord(Long id) {
        HealthRecord existingRecord = healthRecordRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.HEALTH_RECORD_NOT_FOUND));
        return existingRecord;
    }
    public List<Student> getAllHealthRecord() {
        return studentRepository.findAll();
    }
}
