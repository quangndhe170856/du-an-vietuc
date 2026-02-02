package org.example.vietuc.service;


import org.example.vietuc.entity.Contact;
import org.example.vietuc.repository.ContactRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    private final ContactRepository repo;

    public ContactService(ContactRepository repo) {
        this.repo = repo;
    }

    public Contact save(Contact contact) {
        return repo.save(contact);
    }

    public List<Contact> findAll() {
        return repo.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public Contact markHandled(Long id) {
        Contact c = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found"));
        c.setHandled(true);
        return repo.save(c);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}

