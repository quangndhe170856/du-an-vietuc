package org.example.vietuc.dto.project;

import java.util.List;

public class ProjectResponse {

    private Long id;
    private String name;
    private String location;
    private String description;

    private Long companyId;
    private String companyName;
    private String companyLogo;

    private List<String> images;
    private String heroImage;

    public ProjectResponse() {}

    public ProjectResponse(
            Long id,
            String name,
            String location,
            String description,
            Long companyId,
            String companyName,
            String companyLogo,
            List<String> images,
            String heroImage
    ) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.description = description;
        this.companyId = companyId;
        this.companyName = companyName;
        this.companyLogo = companyLogo;
        this.images = images;
        this.heroImage = heroImage;
    }

    // ===== getter & setter =====
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getLocation() {
        return location;
    }

    public String getDescription() {
        return description;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getCompanyLogo() {
        return companyLogo;
    }

    public List<String> getImages() {
        return images;
    }

    public String getHeroImage() {
        return heroImage;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public void setCompanyLogo(String companyLogo) {
        this.companyLogo = companyLogo;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public void setHeroImage(String heroImage) {
        this.heroImage = heroImage;
    }
}
