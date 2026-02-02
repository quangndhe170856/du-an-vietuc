package org.example.vietuc;

import org.example.vietuc.entity.Project;
import org.example.vietuc.service.ProjectService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@SpringBootApplication
public class VietUcApplication {

    public static void main(String[] args) {
        SpringApplication.run(VietUcApplication.class, args);
    }


}
