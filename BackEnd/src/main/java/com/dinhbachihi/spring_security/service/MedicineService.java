package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.request.MedicineAddRequest;
import com.dinhbachihi.spring_security.dto.request.MedicineUpdateRequest;
import com.dinhbachihi.spring_security.dto.response.MedicineResponse;
import com.dinhbachihi.spring_security.dto.response.MedicineSentResponse;
import com.dinhbachihi.spring_security.entity.Medicine;
import com.dinhbachihi.spring_security.entity.UsedMedicine;

import java.util.List;

public interface MedicineService {
    List<MedicineResponse> getAllMedicines();
    Medicine addMedicine(MedicineAddRequest request);
    Medicine updateMedicine(MedicineUpdateRequest request,Long id);
    List<UsedMedicine> getUsedMedicines();
    String deleteMedicine(Long id);
}
