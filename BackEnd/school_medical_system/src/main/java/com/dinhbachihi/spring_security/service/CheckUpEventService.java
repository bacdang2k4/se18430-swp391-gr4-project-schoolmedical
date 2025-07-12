package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.request.CreateCheckUpEventRequest;
import com.dinhbachihi.spring_security.entity.CheckUpEvent;

public interface CheckUpEventService {
    CheckUpEvent addCheckUpEvent(CreateCheckUpEventRequest request);
}
