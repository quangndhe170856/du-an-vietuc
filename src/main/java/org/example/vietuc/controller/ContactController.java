package org.example.vietuc.controller;

import org.example.vietuc.entity.Contact;
import org.example.vietuc.service.ContactService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin("*")
public class ContactController {

    private final ContactService service;

    public ContactController(ContactService service) {
        this.service = service;
    }

    // USER gửi contact
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Contact contact) {

        if (contact.getName().isBlank()
                || contact.getEmail().isBlank()
                || contact.getPhone().isBlank()
                || contact.getMessage().isBlank()) {
            return ResponseEntity.badRequest().body("Thiếu thông tin");
        }

        return ResponseEntity.ok(service.save(contact));
    }

    // ===== ADMIN =====

    @GetMapping("/admin")
    public List<Contact> getAll() {
        return service.findAll();
    }

    @PutMapping("/admin/{id}/handled")
    public ResponseEntity<?> markHandled(@PathVariable Long id) {
        return ResponseEntity.ok(service.markHandled(id));
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<String> deleteAdmin(@PathVariable Long id) {
        // Gọi service để thực hiện xóa trước
        service.delete(id);

        // Sau đó mới trả về kết quả thành công
        return ResponseEntity.ok("Deleted");
    }
}


