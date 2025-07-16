package com.dinhbachihi.spring_security.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.hibernate.annotations.UpdateTimestamp;
import lombok.*;

import java.time.LocalDateTime;
@Entity
@Table(name = "medicine_sent")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

public class MedicineSent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Liên kết với học sinh
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    // Liên kết với phụ huynh gửi thuốc (nếu có bảng Parent)
    @ManyToOne
    @JoinColumn(name = "parent_id", nullable = false)
    private User parent;

    @Column(name = "medicine_name", nullable = false)
    private String medicineName;

    @Column(name = "usage_instructions", nullable = false, columnDefinition = "TEXT")
    private String usageInstructions;

    @Column(name = "send_date", nullable = false)
    @UpdateTimestamp
    private LocalDateTime sendDate;

    @Column(columnDefinition = "TEXT")
    private String notes;

    // Người duyệt đơn thuốc là nhân viên y tế)
    @ManyToOne
    @JoinColumn(name = "Nurse_Id")
    private User approvedBy;
    @Column(nullable = false)
    private boolean isUse = false;

    private String status = "pending";
}
