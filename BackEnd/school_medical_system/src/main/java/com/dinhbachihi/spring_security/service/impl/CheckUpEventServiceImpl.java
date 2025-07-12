package com.dinhbachihi.spring_security.service.impl;

import com.dinhbachihi.spring_security.dto.request.CreateCheckUpEventRequest;
import com.dinhbachihi.spring_security.entity.CheckUpEvent;
import com.dinhbachihi.spring_security.repository.CheckUpEventRepository;
import com.dinhbachihi.spring_security.service.CheckUpEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CheckUpEventServiceImpl implements CheckUpEventService {
    private final CheckUpEventRepository checkUpEventRepository;
    public CheckUpEvent addCheckUpEvent(CreateCheckUpEventRequest request) {
        CheckUpEvent checkUpEvent = new CheckUpEvent();
        checkUpEvent.setEventDate(request.getEventDate());
        checkUpEvent.setDescription(request.getDescription());
        checkUpEvent.setName(request.getName());
        checkUpEvent.setType(request.getType());
        return checkUpEventRepository.save(checkUpEvent);
    }
}
