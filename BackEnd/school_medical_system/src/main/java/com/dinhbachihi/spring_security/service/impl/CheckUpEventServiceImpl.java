package com.dinhbachihi.spring_security.service.impl;

import com.dinhbachihi.spring_security.dto.request.CreateCheckUpEventRequest;
import com.dinhbachihi.spring_security.dto.request.UpdateCheckUpRequest;
import com.dinhbachihi.spring_security.entity.CheckUpEvent;
import com.dinhbachihi.spring_security.entity.CheckUpEventConsent;
import com.dinhbachihi.spring_security.entity.Student;
import com.dinhbachihi.spring_security.repository.CheckUpEventRepository;
import com.dinhbachihi.spring_security.repository.StudentRepository;
import com.dinhbachihi.spring_security.service.CheckUpEventService;
import com.dinhbachihi.spring_security.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CheckUpEventServiceImpl implements CheckUpEventService {
    private final CheckUpEventRepository checkUpEventRepository;
    private final StudentRepository studentRepository;
    private final EmailService emailService;


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
//    public String sendNotification(Long id){ // thông báo
//        List<Student> stu = studentRepository.findAll();
//        CheckUpEvent checkUpEvent = checkUpEventRepository.getReferenceById(id);
//        checkUpEvent.setStatus("isgoing");
//        for(Student student : stu) {
//            if(student.getParent()!=null){
//                CheckUpEventConsent cku = new CheckUpEventConsent();
//                emailService.sendEmail(student.getParent());
//            }
//        }
//    }



}
