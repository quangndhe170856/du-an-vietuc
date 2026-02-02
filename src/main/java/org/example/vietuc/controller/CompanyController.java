package org.example.vietuc.controller;

import org.example.vietuc.dto.company.CompanyCreateRequest;
import org.example.vietuc.dto.company.CompanyResponse;
import org.example.vietuc.dto.company.CompanySimpleResponse;
import org.example.vietuc.service.CompanyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    // GET: danh sách công ty (đầy đủ)
    @GetMapping
    public List<CompanyResponse> getAll() {
        return companyService.getAll();
    }

    // GET: danh sách đơn giản (dropdown)
    @GetMapping("/simple")
    public List<CompanySimpleResponse> getSimple() {
        return companyService.getSimple();
    }

    // POST: tạo công ty
    @PostMapping
    public CompanyResponse create(@RequestBody CompanyCreateRequest request) {
        return companyService.create(request);
    }
}
