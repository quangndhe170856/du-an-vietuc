package org.example.vietuc.controller;

import org.example.vietuc.dto.project.ProjectCreateRequest;
import org.example.vietuc.dto.project.ProjectResponse;
import org.example.vietuc.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // ===== PUBLIC =====
    @GetMapping
    public List<ProjectResponse> getAll() {
        return projectService.getAll();
    }

    @GetMapping("/{id}")
    public ProjectResponse getById(@PathVariable Long id) {
        return projectService.getById(id);
    }

    // ===== ADMIN =====
    @PostMapping("/admin")
    public ProjectResponse create(
            @RequestHeader("X-ROLE") String role,
            @RequestBody ProjectCreateRequest request
    ) {
        checkAdmin(role);
        return projectService.create(request);
    }

    @PutMapping("/admin/{id}")
    public ProjectResponse update(
            @RequestHeader("X-ROLE") String role,
            @PathVariable Long id,
            @RequestBody ProjectCreateRequest request
    ) {
        checkAdmin(role);
        return projectService.update(id, request);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<?> delete(
            @RequestHeader("X-ROLE") String role,
            @PathVariable Long id
    ) {
        checkAdmin(role);
        projectService.delete(id);
        return ResponseEntity.ok("Deleted");
    }

    @PostMapping("/admin/{id}/images")
    public void uploadImages(
            @RequestHeader("X-ROLE") String role,
            @PathVariable Long id,
            @RequestParam("files") List<MultipartFile> files
    ) throws IOException {
        checkAdmin(role);
        projectService.addImages(id, files);
    }

    // ===== HELPER =====
    private void checkAdmin(String role) {
        if (!"ADMIN".equals(role)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Access denied"
            );
        }
    }
}




