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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public Map<String, Object> getHealthOverviewReport() {
        List<HealthRecord> records = healthRecordRepository.findAll();

        int totalStudents = records.size();
        long studentsWithAllergies = records.stream().filter(r -> r.getAllergy() != null && !r.getAllergy().isEmpty()).count();
        long studentsWithChronicDiseases = records.stream().filter(r -> r.getChronic_disease() != null && !r.getChronic_disease().isEmpty()).count();
        double avgHeight = records.stream().filter(r -> r.getHeight() != null).mapToDouble(HealthRecord::getHeight).average().orElse(0);
        double avgWeight = records.stream().filter(r -> r.getWeight() != null).mapToDouble(HealthRecord::getWeight).average().orElse(0);

        Map<String, Object> report = new HashMap<>();
        report.put("totalStudents", totalStudents);
        report.put("studentsWithAllergies", studentsWithAllergies);
        report.put("studentsWithChronicDiseases", studentsWithChronicDiseases);
        report.put("averageHeight", avgHeight);
        report.put("averageWeight", avgWeight);

        return report;
    }
}
