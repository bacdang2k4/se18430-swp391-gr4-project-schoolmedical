package com.dinhbachihi.spring_security.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String type;
    private int quantity;
    private String unit;


    @OneToMany(mappedBy = "medicine", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<UsedMedicine> usedMedicines;


}
