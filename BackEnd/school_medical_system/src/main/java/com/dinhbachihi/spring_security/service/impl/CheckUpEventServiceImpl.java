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
    public String sendNotification(Long id){ // thông báo
        List<Student> stu = studentRepository.findAll();
        CheckUpEvent checkUpEvent = checkUpEventRepository.getReferenceById(id);
        checkUpEvent.setStatus("isgoing");
        for(Student student : stu) {
            if(student.getParent()!=null){
                CheckUpEventConsent cku = new CheckUpEventConsent();
                emailService.sendEmail(student.getParent().getEmail(),checkUpEvent.getName(),checkUpEvent.getDescription());
                cku.setCheckUp(checkUpEvent);
                cku.setStudent(student);
                cku.setParent(student.getParent());
                checkUpEventConsentRepository.save(cku);
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

    public List<Student> getStudentAccept(Long id) {
        List<Student> students = checkUpEventConsentRepository.findByConsent("Accepted")
                .stream()
                .map(CheckUpEventConsent::getStudent)
                .collect(Collectors.toList());
        for (Student student : students) {
            CheckUpEventResult checkupr = new CheckUpEventResult();
            checkupr.setStudent(student);
            checkupr.setCheckUpEvent(checkUpEventConsentRepository.getReferenceById(id).getCheckUp());
            checkupr.setCheckupDate(checkUpEventConsentRepository.getReferenceById(id).getCheckUp().getEventDate());
            checkUpEventResultRepository.save(checkupr);
        }
        return students;
    }

    public CheckUpEventResult recordCheckupEventResult(Long Id , RecordCheckUpEventRequest request) {
         CheckUpEventResult checkupr = checkUpEventResultRepository.findById(Id).orElseThrow( () -> new AppException(ErrorCode.CR_NOT_FOUND));
         Authentication auth = SecurityContextHolder.getContext().getAuthentication();
         String email = auth.getName();
         User nurse = userRepository.findByEmail(email).orElseThrow( () -> new AppException(ErrorCode.USER_NOT_FOUND));
         checkupr.setCheckupDate(checkUpEventResultRepository.getReferenceById(Id).getCheckupDate());
         checkupr.setCheckUpEvent(checkUpEventResultRepository.getReferenceById(Id).getCheckUpEvent());
         checkupr.setCheckup(checkUpEventResultRepository.getReferenceById(Id).getCheckup());
         checkupr.setNurse(nurse);
         return  checkUpEventResultRepository.save(checkupr);
    }
    public List<CheckUpEventResult> getCheckUpEventResults() {
        return checkUpEventResultRepository.findAll();
    }

}
