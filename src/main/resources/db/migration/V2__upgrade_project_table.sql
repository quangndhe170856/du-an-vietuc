
CREATE TABLE IF NOT EXISTS companies (
                                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                         name VARCHAR(255) NOT NULL,
                                         logo VARCHAR(255),
                                         description TEXT,
                                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Thêm cột company_id vào projects (nếu chưa có)
ALTER TABLE projects
    ADD COLUMN company_id BIGINT NULL;

-- 3. Tạo company mặc định cho data cũ
INSERT INTO companies (name, description)
SELECT 'Default Company', 'Auto generated'
WHERE NOT EXISTS (SELECT 1 FROM companies);

-- 4. Gán company_id cho project cũ
UPDATE projects
SET company_id = (SELECT id FROM companies LIMIT 1)
WHERE company_id IS NULL;

-- 5. Thêm khóa ngoại
ALTER TABLE projects
    ADD CONSTRAINT fk_project_company
        FOREIGN KEY (company_id) REFERENCES companies(id);

-- 6. Tạo bảng project_images (MỚI)
CREATE TABLE IF NOT EXISTS project_images (
                                              id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                              image_url VARCHAR(255) NOT NULL,
                                              is_primary BOOLEAN DEFAULT FALSE,
                                              project_id BIGINT NOT NULL,
                                              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                                              CONSTRAINT fk_project_image
                                                  FOREIGN KEY (project_id) REFERENCES projects(id)
                                                      ON DELETE CASCADE
);

-- 7. Migrage ảnh cũ (projects.image → project_images)
INSERT INTO project_images (image_url, is_primary, project_id)
SELECT image, TRUE, id
FROM projects
WHERE image IS NOT NULL;

SHOW CREATE TABLE projects;



CREATE TABLE contacts (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          email VARCHAR(255) NOT NULL,
                          phone VARCHAR(20) NOT NULL,
                          message TEXT NOT NULL,
                          created_at DATETIME
);



ALTER TABLE contacts ADD COLUMN handled BOOLEAN DEFAULT FALSE;

