    package org.example.vietuc.service;

    import org.example.vietuc.dto.project.ProjectCreateRequest;
    import org.example.vietuc.dto.project.ProjectResponse;
    import org.example.vietuc.entity.Company;
    import org.example.vietuc.entity.Project;
    import org.example.vietuc.entity.ProjectImage;
    import org.example.vietuc.repository.CompanyRepository;
    import org.example.vietuc.repository.ProjectRepository;
    import org.springframework.stereotype.Service;
    import org.springframework.transaction.annotation.Transactional;
    import org.springframework.web.multipart.MultipartFile;

    import java.io.IOException;
    import java.nio.file.Files;
    import java.nio.file.Path;
    import java.nio.file.Paths;
    import java.util.List;

    @Service
    public class ProjectService {

        private final ProjectRepository projectRepository;
        private final CompanyRepository companyRepository;
        private final CloudinaryService cloudinaryService;

        public ProjectService(ProjectRepository projectRepository,
                              CompanyRepository companyRepository,
                              CloudinaryService cloudinaryService) {
            this.projectRepository = projectRepository;
            this.companyRepository = companyRepository;
            this.cloudinaryService = cloudinaryService;
        }


        @Transactional(readOnly = true)
        public List<ProjectResponse> getAll() {
            return projectRepository.findAll()
                    .stream()
                    .map(p -> {

                        String heroImage = p.getImages()
                                .stream()
                                .filter(i -> Boolean.TRUE.equals(i.getIsPrimary()))
                                .map(ProjectImage::getImageUrl)
                                .findFirst()
                                .orElse(null);

                        return new ProjectResponse(
                                p.getId(),
                                p.getName(),
                                p.getLocation(),
                                p.getDescription(),
                                p.getCompany().getId(),
                                p.getCompany().getName(),
                                p.getCompany().getLogo(),
                                null,          // list ảnh không cần load ở list
                                heroImage
                        );
                    })
                    .toList();
        }


        @Transactional
        public ProjectResponse create(ProjectCreateRequest req) {

            Company company = companyRepository.findById(req.getCompanyId())
                    .orElseThrow(() -> new RuntimeException("Company not found"));

            Project project = new Project();
            project.setName(req.getName());
            project.setLocation(req.getLocation());
            project.setDescription(req.getDescription());
            project.setCompany(company);

            Project saved = projectRepository.save(project);

            return new ProjectResponse(
                    saved.getId(),
                    saved.getName(),
                    saved.getLocation(),
                    saved.getDescription(),
                    company.getId(),
                    company.getName(),
                    company.getLogo(),
                    null,
                    null
            );
        }


        @Transactional(readOnly = true)
        public ProjectResponse getById(Long id) {

            Project p = projectRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Project not found"));

            List<String> images = p.getImages()
                    .stream()
                    .map(ProjectImage::getImageUrl)
                    .toList();

            String heroImage = p.getImages()
                    .stream()
                    .filter(i -> Boolean.TRUE.equals(i.getIsPrimary()))
                    .map(ProjectImage::getImageUrl)
                    .findFirst()
                    .orElse(null);

            return new ProjectResponse(
                    p.getId(),
                    p.getName(),
                    p.getLocation(),
                    p.getDescription(),
                    p.getCompany().getId(),
                    p.getCompany().getName(),
                    p.getCompany().getLogo(),
                    images,
                    heroImage
            );
        }


        @Transactional
        public void addImages(Long projectId, List<MultipartFile> files) throws IOException {

            Project project = projectRepository.findById(projectId)
                    .orElseThrow(() -> new RuntimeException("Project not found"));

            for (int i = 0; i < files.size(); i++) {

                String imageUrl = cloudinaryService.uploadImage(files.get(i));

                ProjectImage image = new ProjectImage();
                image.setImageUrl(imageUrl);
                image.setIsPrimary(i == 0);
                image.setProject(project);

                project.getImages().add(image);
            }
            projectRepository.save(project);
        }



        @Transactional
        public void delete(Long id) {
            if (!projectRepository.existsById(id)) {
                throw new RuntimeException("Project not found");
            }
            projectRepository.deleteById(id);
        }

        @Transactional
        public ProjectResponse update(Long id, ProjectCreateRequest req) {

            Project project = projectRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Project not found"));

            Company company = companyRepository.findById(req.getCompanyId())
                    .orElseThrow(() -> new RuntimeException("Company not found"));

            project.setName(req.getName());
            project.setLocation(req.getLocation());
            project.setDescription(req.getDescription());
            project.setCompany(company);

            Project saved = projectRepository.save(project);

            return new ProjectResponse(
                    saved.getId(),
                    saved.getName(),
                    saved.getLocation(),
                    saved.getDescription(),
                    company.getId(),
                    company.getName(),
                    company.getLogo(),
                    null,
                    null
            );
        }


    }
