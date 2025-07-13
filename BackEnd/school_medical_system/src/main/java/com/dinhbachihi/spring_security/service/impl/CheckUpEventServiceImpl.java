package com.dinhbachihi.spring_security.service.impl;

import com.dinhbachihi.spring_security.dto.request.CreateCheckUpEventRequest;
import com.dinhbachihi.spring_security.dto.request.RecordCheckUpEventRequest;
import com.dinhbachihi.spring_security.dto.request.RecordVaccinationResult;
import com.dinhbachihi.spring_security.dto.request.UpdateCheckUpRequest;
import com.dinhbachihi.spring_security.dto.response.ConsentFormReviewResponse;
import com.dinhbachihi.spring_security.entity.*;
import com.dinhbachihi.spring_security.exception.AppException;
import com.dinhbachihi.spring_security.exception.ErrorCode;
import com.dinhbachihi.spring_security.repository.*;
import com.dinhbachihi.spring_security.service.CheckUpEventService;
import com.dinhbachihi.spring_security.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.prefs.Preferences;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CheckUpEventServiceImpl implements CheckUpEventService {
    private final CheckUpEventRepository checkUpEventRepository;
    private final StudentRepository studentRepository;
    private final EmailService emailService;
    private final CheckUpEventConsentRepository checkUpEventConsentRepository;
    private final CheckUpEventResultRepository checkUpEventResultRepository;
    private  final UserRepository userRepository;
    private final HealthRecordRepository healthRecordRepository;


    public CheckUpEvent addCheckUpEvent(CreateCheckUpEventRequest request) {
        CheckUpEvent checkUpEvent = new CheckUpEvent();
        checkUpEvent.setEventDate(request.getEventDate());
        checkUpEvent.setDescription(request.getDescription());
        checkUpEvent.setName(request.getName());
        checkUpEvent.setType(request.getType());
        return checkUpEventRepository.save(checkUpEvent);
    }
    public CheckUpEvent updateCheckUpEvent(UpdateCheckUpRequest request , Long id) {
        CheckUpEvent checkUpEvent = checkUpEventRepository.findById(id).get();
        checkUpEvent.setEventDate(request.getEventDate());
        checkUpEvent.setDescription(request.getDescription());
        return checkUpEventRepository.save(checkUpEvent);
    }
    public String deleteCheckUpEvent(Long id) {
        CheckUpEvent checkUpEvent = checkUpEventRepository.findById(id).get();
        checkUpEventRepository.delete(checkUpEvent);
        String message = "Event deleted successfully";
        return message;
    }

    public List<CheckUpEvent> getAllCheckUpEvents() {
        return checkUpEventRepository.findAll();
    }
    public String markCheckUpEvent(Long id) {
        CheckUpEvent checkUpEvent = checkUpEventRepository.findById(id).get();
        checkUpEvent.setStatus("finished");
        checkUpEventRepository.save(checkUpEvent);
        return "Mark finished successfully";
    }

    public String sendNotification(Long id){ // thông báo
        List<Student> stu = studentRepository.findAll();
        CheckUpEvent checkUpEvent = checkUpEventRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CE_NOT_FOUND));
        checkUpEvent.setStatus("isgoing");
        for(Student student : stu) {
            boolean notExists = checkUpEventConsentRepository
                    .findByStudentAndEvent(student, checkUpEvent)
                    .isEmpty();
            if(notExists) {
            if(student.getParent()!=null){
                CheckUpEventConsent cku = new CheckUpEventConsent();
                emailService.sendEmail(student.getParent().getEmail(),checkUpEvent.getName(),checkUpEvent.getDescription());
                cku.setEvent(checkUpEvent);
                cku.setStudent(student);
                cku.setParent(student.getParent());
                checkUpEventConsentRepository.save(cku);}
            }
        }
        return  "Successfully sent notification";
    }

    public CheckUpEventConsent acceptCheckUpEventConsent(Long id) {
        CheckUpEventConsent checkUpEventConsent = checkUpEventConsentRepository.getReferenceById(id);
        checkUpEventConsent.setConsent("Accepted");
        return checkUpEventConsentRepository.save(checkUpEventConsent);
    }
    public CheckUpEventConsent rejectCheckUpEventConsent(Long id) {
        CheckUpEventConsent checkUpEventConsent = checkUpEventConsentRepository.getReferenceById(id);
        checkUpEventConsent.setConsent("Reject");
        return checkUpEventConsentRepository.save(checkUpEventConsent);
    }

    public List<CheckUpEventConsent> getStudentAccept(Long id) {
        CheckUpEvent ce = checkUpEventRepository.findById(id).orElseThrow( () -> new AppException(ErrorCode.CE_NOT_FOUND));
        List<CheckUpEventConsent> list = checkUpEventConsentRepository.findByConsentAndEvent("Accepted",ce);
        for(CheckUpEventConsent checkUpEventConsent : list) {
            Student student = checkUpEventConsent.getStudent();
            boolean exists = checkUpEventResultRepository.findByStudentAndEvent(student,ce).isEmpty();
            if(exists){
                CheckUpEventResult checkUpEventResult = new CheckUpEventResult();
                checkUpEventResult.setStudent(student);
                checkUpEventResult.setEvent(ce);
                checkUpEventResult.setCheckupDate(ce.getEventDate());
                checkUpEventResultRepository.save(checkUpEventResult);
            }
        }
        return list;
    }
    public List<CheckUpEventConsent> getStudentReject(Long id) {
        CheckUpEvent ce = checkUpEventRepository.findById(id).orElseThrow( () -> new AppException(ErrorCode.CE_NOT_FOUND));
        List<CheckUpEventConsent> list = checkUpEventConsentRepository.findByConsentAndEvent("Reject",ce);
        return list;
    }

    public CheckUpEventResult recordCheckupEventResult(Long Id , RecordCheckUpEventRequest request) {
         CheckUpEventResult result = checkUpEventResultRepository.findById(Id).orElseThrow( () -> new AppException(ErrorCode.CR_NOT_FOUND));
         Authentication auth = SecurityContextHolder.getContext().getAuthentication();
         String email = auth.getName();
         User nurse = userRepository.findByEmail(email).orElseThrow( () -> new AppException(ErrorCode.USER_NOT_FOUND));
        result.setNote(request.getNote());
        result.setHearing(request.getHearing());
        result.setHeight(request.getHeight());
        result.setWeight(request.getWeight());
        result.setNurse(nurse);
        result.setResult("Completed");
        result.setVision(request.getVision());
        checkUpEventResultRepository.save(result);

        Student student = studentRepository.getReferenceById(result.getStudent().getStudentId());
        HealthRecord healthRecord = student.getHealthRecord();
        healthRecord.setHeight(result.getHeight());
        healthRecord.setWeight(result.getWeight());
        healthRecord.setVision(result.getVision());
        healthRecord.setHearing(result.getHearing());
        healthRecordRepository.save(healthRecord);
        return result;
    }
    public List<CheckUpEventResult> getCheckUpEventResults() {
        return checkUpEventResultRepository.findAll();
    }

    public List<CheckUpEventConsent> getList(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User parent = userRepository.findByEmail(email).orElseThrow( () -> new AppException(ErrorCode.USER_NOT_FOUND));
        return parent.getList();

    }

}
