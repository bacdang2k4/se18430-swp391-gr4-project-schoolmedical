package com.dinhbachihi.spring_security.service.impl;

import com.dinhbachihi.spring_security.dto.request.MedicalEventRequest;
import com.dinhbachihi.spring_security.dto.request.UsedMedicineRequest;
import com.dinhbachihi.spring_security.dto.response.MedicalEventResponse;
import com.dinhbachihi.spring_security.dto.response.UsedMedicineDTO;
import com.dinhbachihi.spring_security.entity.*;
import com.dinhbachihi.spring_security.exception.AppException;
import com.dinhbachihi.spring_security.exception.ErrorCode;
import com.dinhbachihi.spring_security.repository.*;
import com.dinhbachihi.spring_security.service.JWTService;
import com.dinhbachihi.spring_security.service.MedicalEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class MedicalEventServiceImpl implements MedicalEventService {
    @Autowired
    private MedicalEventRepository medicalEventRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MedicineRepository medicineRepository;
    @Autowired
    private UsedMedicineRepository usedMedicineRepository;

    @Autowired
    private JWTService jwtService;

    public MedicalEventResponse createMedicalEvent(MedicalEventRequest request ,String id) {
        Student student = studentRepository.getReferenceById(id);

        MedicalEvent medicalEvent = new MedicalEvent();
        medicalEvent.setStudent(student);
        medicalEvent.setMedicalEventDescription(request.getMedicalEventDescription());
        medicalEvent.setMedicalEventName(request.getMedicalEventName());
        medicalEvent.setType(request.getType());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        medicalEvent.setNurse(user);

        MedicalEvent savedEvent = medicalEventRepository.save(medicalEvent);

        List<UsedMedicine> usedMedicines = new ArrayList<>();
        List<UsedMedicineDTO> usedMedicineDTOs = new ArrayList<>();

        for (UsedMedicineRequest medRequest : request.getMedicineList()) {
            Medicine medicine = medicineRepository.getReferenceById(medRequest.getMedicineId());
            medicine.setQuantity(medicine.getQuantity()-medRequest.getQuantityUsed());
            UsedMedicineKey key = new UsedMedicineKey();
            key.setMedicalEventId(savedEvent.getMedicalEventId());
            key.setMedicineId(medicine.getId());

            UsedMedicine used = new UsedMedicine();
            used.setId(key);
            used.setMedicalEvent(savedEvent);
            used.setMedicine(medicine);
            used.setQuantityUsed(medRequest.getQuantityUsed());

            usedMedicines.add(used);

            // Mapping sang DTO để trả về
            UsedMedicineDTO dto = new UsedMedicineDTO();
            dto.setName(medicine.getName());
            dto.setQuantityUsed(medRequest.getQuantityUsed());
            usedMedicineDTOs.add(dto);
        }

        // Lưu danh sách thuốc đã dùng
        usedMedicineRepository.saveAll(usedMedicines);

        // Tạo response
        MedicalEventResponse response = new MedicalEventResponse();
        response.setMedicalEventId(savedEvent.getMedicalEventId());
        response.setMedicalEventDescription(savedEvent.getMedicalEventDescription());
        response.setMedicalEventName(savedEvent.getMedicalEventName());
        response.setType(savedEvent.getType());
        response.setMedicalEventTime(savedEvent.getMedicalEventTime());
        response.setStudent(savedEvent.getStudent().getStudentId());
        response.setNurse(savedEvent.getNurse().getId());
        response.setMedicineList(usedMedicineDTOs);

        return response;
    }
    public List<MedicalEvent> getMedicalEvents (){
        return medicalEventRepository.findAll();
    }

    public String deleteMedicalEventById(Long medicalEventId) {
        medicalEventRepository.findById(medicalEventId).orElseThrow(() -> new AppException(ErrorCode.MEDICAL_EVENT_NOT_FOUND));
        medicalEventRepository.deleteById(medicalEventId);
        return "medical event deleted";
    }

    public Map<String, Object> getMedicalEventReport() {
        List<MedicalEvent> events = medicalEventRepository.findAll();

        int totalEvents = events.size();
        long accidents = events.stream().filter(e -> "accident".equalsIgnoreCase(e.getType())).count();
        long illnesses = events.stream().filter(e -> "illness".equalsIgnoreCase(e.getType())).count();
        long allergicReactions = events.stream().filter(e -> "allergy".equalsIgnoreCase(e.getType())).count();
        long emergencies = events.stream().filter(e -> "emergency".equalsIgnoreCase(e.getType())).count();

        Map<String, Object> report = new HashMap<>();
        report.put("totalEvents", totalEvents);
        report.put("accidents", accidents);
        report.put("illnesses", illnesses);
        report.put("allergicReactions", allergicReactions);
        report.put("emergencies", emergencies);

        return report;
    }
}
