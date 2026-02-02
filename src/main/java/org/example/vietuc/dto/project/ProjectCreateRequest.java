package org.example.vietuc.dto.project;

public class ProjectCreateRequest {

    private String name;
    private String location;
    private String description;
    private Long companyId;

    // constructor rỗng
    public ProjectCreateRequest() {}

    // ===== getter & setter =====
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }
}
