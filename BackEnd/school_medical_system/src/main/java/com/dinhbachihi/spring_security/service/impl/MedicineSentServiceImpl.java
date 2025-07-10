package com.dinhbachihi.spring_security.service.impl;

import com.dinhbachihi.spring_security.dto.request.MedicineSentRequest;
import com.dinhbachihi.spring_security.dto.response.MedicineSentResponse;
import com.dinhbachihi.spring_security.entity.MedicineSent;
import com.dinhbachihi.spring_security.entity.Student;
import com.dinhbachihi.spring_security.entity.User;
import com.dinhbachihi.spring_security.exception.AppException;
import com.dinhbachihi.spring_security.exception.ErrorCode;
import com.dinhbachihi.spring_security.repository.MedicineSentRepository;
import com.dinhbachihi.spring_security.repository.StudentRepository;
import com.dinhbachihi.spring_security.repository.UserRepository;
import com.dinhbachihi.spring_security.service.MedicineSentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class MedicineSentServiceImpl implements MedicineSentService {

    private final MedicineSentRepository medicineSentRepository;
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;


    public MedicineSent createMedicineSent(MedicineSentRequest request, String stdId ){
        MedicineSent medicineSent = new MedicineSent();
        Student student = studentRepository.getReferenceById(stdId);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User parent = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        medicineSent.setStudent(student);
        medicineSent.setParent(parent);
        medicineSent.setMedicineName(request.getMedicineName());
        medicineSent.setUsageInstructions(request.getUsageInstructions());
        medicineSent.setNotes(request.getNote());
        return medicineSentRepository.save(medicineSent);
    }
    public List<MedicineSentResponse> getMedicineSents(){
        List<MedicineSent> list = medicineSentRepository.findAll();
        List<MedicineSentResponse> responses = new ArrayList<>();
        for(MedicineSent medicineSent : list){
            MedicineSentResponse response = new MedicineSentResponse();
            response.setId(medicineSent.getId());
            response.setStudentId(String.valueOf(medicineSent.getStudent().getStudentId()));
            response.setParentId(String.valueOf(medicineSent.getParent().getId()));
            response.setApprovedBy(medicineSent.getApprovedBy() != null ?
                    String.valueOf(medicineSent.getApprovedBy().getId()) : null);
            response.setMedicineName(medicineSent.getMedicineName());
            response.setDescription(medicineSent.getUsageInstructions());
            response.setNote(medicineSent.getNotes());
            response.setSendDate(medicineSent.getSendDate());
            response.setStatus(medicineSent.getStatus());
            response.setUse(medicineSent.isUse());
            responses.add(response);
        }
    return responses;
    }

    @Override
    public List<MedicineSentResponse> getMedicineSentsByCurrentParent() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User parent = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        List<MedicineSent> list = medicineSentRepository.findByParent(parent);
        List<MedicineSentResponse> responses = new ArrayList<>();
        for (MedicineSent medicineSent : list) {
            MedicineSentResponse response = new MedicineSentResponse();
            response.setId(medicineSent.getId());
            response.setStudentId(String.valueOf(medicineSent.getStudent().getStudentId()));
            response.setParentId(String.valueOf(medicineSent.getParent().getId()));
            response.setApprovedBy(medicineSent.getApprovedBy() != null ?
                    String.valueOf(medicineSent.getApprovedBy().getId()) : null);
            response.setMedicineName(medicineSent.getMedicineName());
            response.setDescription(medicineSent.getUsageInstructions());
            response.setNote(medicineSent.getNotes());
            response.setSendDate(medicineSent.getSendDate());
            response.setStatus(medicineSent.getStatus());
            response.setUse(medicineSent.isUse());
            responses.add(response);
        }
        return responses;
    }

    public MedicineSent acceptMedicineSent( Long id ){
        MedicineSent medicineSent = medicineSentRepository.getReferenceById(id);
        medicineSent.setStatus("received");
        return medicineSentRepository.save(medicineSent);
    }

    public MedicineSent setUse( Long id ){
        MedicineSent medicineSent = medicineSentRepository.getReferenceById(id);
        medicineSent.setStatus("used");
        return medicineSentRepository.save(medicineSent);
    }
}
