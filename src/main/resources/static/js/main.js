const role = localStorage.getItem("role");
const API_URL = "http://localhost:8080/api/projects";
const BASE_URL = "http://localhost:8080";

fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("project-list");
        container.innerHTML = "";

        data.forEach(p => {
            // ===== LOGIC XỬ LÝ ĐƯỜNG DẪN ẢNH THÔNG MINH =====
            let finalSrc = "";

            if (p.heroImage) {
                // Nếu ảnh bắt đầu bằng "http" (Link Cloudinary), dùng luôn không nối BASE_URL
                // Nếu không, nối với BASE_URL (cho ảnh local cũ)
                finalSrc = p.heroImage.startsWith("http")
                    ? p.heroImage
                    : `${BASE_URL}${p.heroImage.startsWith("/") ? "" : "/"}${p.heroImage}`;
            } else {
                // Ảnh mặc định - Thêm dấu / để tránh lỗi dính chữ (localhost:8080img/...)
                finalSrc = `${BASE_URL}/img/no-image.jpg`;
            }

            let adminActions = "";
            if (role === "ADMIN") {
                adminActions = `
                    <div class="d-flex gap-2 mt-2">
                        <button class="btn btn-warning btn-sm w-50"
                                onclick="editProject(${p.id})">
                            <i class="bi bi-pencil"></i> Sửa
                        </button>
                        <button class="btn btn-danger btn-sm w-50"
                                onclick="deleteProject(${p.id})">
                            <i class="bi bi-trash"></i> Xóa
                        </button>
                    </div>
                `;
            }

            container.innerHTML += `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="card h-100 shadow-sm">
                        <div style="height: 200px; overflow: hidden;">
                            <img src="${finalSrc}"
                                 class="card-img-top w-100 h-100"
                                 style="object-fit: cover;"
                                 alt="${p.name}">
                        </div>

                        <div class="card-body">
                            <h5>${p.name}</h5>
                            <p class="text-muted">
                                <i class="bi bi-geo-alt"></i> ${p.location ?? ""}
                            </p>
                            <p class="fw-semibold">${p.companyName ?? ""}</p>

                            <a href="project-detail.html?id=${p.id}"
                               class="btn btn-outline-primary w-100">
                                Xem chi tiết
                            </a>

                            ${adminActions}
                        </div>
                    </div>
                </div>
            `;
        });
    })
    .catch(err => console.error("Lỗi tải danh sách:", err));