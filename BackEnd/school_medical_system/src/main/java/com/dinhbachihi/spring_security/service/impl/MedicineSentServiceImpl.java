package com.dinhbachihi.spring_security.service.impl;

import com.dinhbachihi.spring_security.dto.request.MedicineSentRequest;
import com.dinhbachihi.spring_security.entity.MedicineSent;
import com.dinhbachihi.spring_security.entity.Student;
import com.dinhbachihi.spring_security.entity.User;
import com.dinhbachihi.spring_security.repository.MedicineSentRepository;
import com.dinhbachihi.spring_security.repository.StudentRepository;
import com.dinhbachihi.spring_security.repository.UserRepository;
import com.dinhbachihi.spring_security.service.MedicineSentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class MedicineSentServiceImpl implements MedicineSentService {

    private final MedicineSentRepository medicineSentRepository;
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;


    public MedicineSent createMedicineSent(MedicineSentRequest request, String stdId , String nurID){
        MedicineSent medicineSent = new MedicineSent();
        Student student = studentRepository.getReferenceById(stdId);
        User parent = userRepository.getReferenceById(nurID);
        User nurse = userRepository.getReferenceById(nurID);
        medicineSent.setStudent(student);
        medicineSent.setParent(parent);
        medicineSent.setMedicineName(request.getMedicineName());
        medicineSent.setUsageInstructions(request.getUsageInstructions());
        medicineSent.setNotes(request.getNote());
        medicineSent.setApprovedBy(nurse);

        return medicineSentRepository.save(medicineSent);
    }
}
