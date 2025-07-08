package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.response.MedicineResponse;
import com.dinhbachihi.spring_security.dto.response.MedicineSentResponse;
import com.dinhbachihi.spring_security.entity.Medicine;

import java.util.List;

public interface MedicineService {
    List<MedicineResponse> getAllMedicines();
}
