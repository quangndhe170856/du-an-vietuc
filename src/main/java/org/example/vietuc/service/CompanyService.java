package org.example.vietuc.service;

import org.example.vietuc.dto.company.CompanyCreateRequest;
import org.example.vietuc.dto.company.CompanyResponse;
import org.example.vietuc.dto.company.CompanySimpleResponse;
import org.example.vietuc.entity.Company;
import org.example.vietuc.repository.CompanyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Transactional(readOnly = true)
    public List<CompanyResponse> getAll() {
        return companyRepository.findAll()
                .stream()
                .map(c -> new CompanyResponse(
                        c.getId(),
                        c.getName(),
                        c.getLogo(),
                        c.getDescription()
                ))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<CompanySimpleResponse> getSimple() {
        return companyRepository.findAll()
                .stream()
                .map(c -> new CompanySimpleResponse(
                        c.getId(),
                        c.getName()
                ))
                .toList();
    }

    @Transactional
    public CompanyResponse create(CompanyCreateRequest req) {
        Company company = new Company();
        company.setName(req.getName());
        company.setLogo(req.getLogo());
        company.setDescription(req.getDescription());

        Company saved = companyRepository.save(company);

        return new CompanyResponse(
                saved.getId(),
                saved.getName(),
                saved.getLogo(),
                saved.getDescription()
        );
    }



}
