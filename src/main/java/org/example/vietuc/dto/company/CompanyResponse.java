package org.example.vietuc.dto.company;

public record CompanyResponse(
        Long id,
        String name,
        String logo,
        String description
) {}
