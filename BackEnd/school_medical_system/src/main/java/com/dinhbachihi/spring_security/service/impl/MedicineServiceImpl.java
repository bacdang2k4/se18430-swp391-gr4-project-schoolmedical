package com.dinhbachihi.spring_security.service.impl;

import com.dinhbachihi.spring_security.dto.response.MedicineResponse;
import com.dinhbachihi.spring_security.entity.Medicine;
import com.dinhbachihi.spring_security.repository.MedicineRepository;
import com.dinhbachihi.spring_security.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class MedicineServiceImpl implements MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    @Override
    public List<MedicineResponse> getAllMedicines() {
        List<Medicine> medicines = medicineRepository.findAll();
        return medicines.stream()
                .map(m -> new MedicineResponse(m.getId(), m.getName(), m.getQuantity(), m.getType(), m.getUnit()))
                .collect(Collectors.toList());
    }

}
