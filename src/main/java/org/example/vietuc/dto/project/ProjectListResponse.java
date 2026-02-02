package org.example.vietuc.dto.project;

public record ProjectListResponse(
        Long id,
        String name,
        String location,
        String image,
        String companyName
) {}
