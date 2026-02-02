const role = localStorage.getItem("role");

// 1. TỰ ĐỘNG LẤY BASE_URL (Localhost hoặc Railway)
const BASE_URL = window.location.origin;
const API_URL = `${BASE_URL}/api/projects`;

fetch(API_URL)
    .then(res => {
        if (!res.ok) throw new Error("Không thể tải danh sách dự án");
        return res.json();
    })
    .then(data => {
        const container = document.getElementById("project-list");
        if (!container) return; // Bảo vệ nếu trang không có id này
        container.innerHTML = "";

        data.forEach(p => {
            // 2. LOGIC XỬ LÝ ĐƯỜNG DẪN ẢNH THÔNG MINH
            let finalSrc = "";

            if (p.heroImage) {
                // Nếu là link tuyệt đối (Cloudinary/Internet) thì dùng luôn
                // Nếu là link tương đối (/uploads/...) thì nối với BASE_URL hiện tại
                finalSrc = p.heroImage.startsWith("http")
                    ? p.heroImage
                    : `${BASE_URL}${p.heroImage.startsWith("/") ? "" : "/"}${p.heroImage}`;
            } else {
                // Ảnh mặc định
                finalSrc = `${BASE_URL}/img/no-image.jpg`;
            }

            // 3. XỬ LÝ QUYỀN ADMIN
            let adminActions = "";
            if (role === "ADMIN") {
                adminActions = `
                    <div class="d-flex gap-2 mt-2">
                        <button class="btn btn-warning btn-sm w-50" onclick="editProject(${p.id})">
                            <i class="bi bi-pencil"></i> Sửa
                        </button>
                        <button class="btn btn-danger btn-sm w-50" onclick="deleteProject(${p.id})">
                            <i class="bi bi-trash"></i> Xóa
                        </button>
                    </div>
                `;
            }

            // 4. RENDER GIAO DIỆN
            container.innerHTML += `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="card h-100 shadow-sm">
                        <div style="height: 200px; overflow: hidden;">
                            <img src="${finalSrc}" 
                                 class="card-img-top w-100 h-100" 
                                 style="object-fit: cover;" 
                                 alt="${p.name}"
                                 onerror="this.src='${BASE_URL}/img/no-image.jpg'">
                        </div>

                        <div class="card-body">
                            <h5 class="card-title text-truncate">${p.name}</h5>
                            <p class="text-muted small">
                                <i class="bi bi-geo-alt"></i> ${p.location ?? "Chưa rõ địa điểm"}
                            </p>
                            <p class="fw-semibold text-primary">${p.companyName ?? "Công ty Việt Úc"}</p>

                            <a href="project-detail.html?id=${p.id}" class="btn btn-outline-primary w-100">
                                Xem chi tiết
                            </a>

                            ${adminActions}
                        </div>
                    </div>
                </div>
            `;
        });
    })
    .catch(err => {
        console.error("Lỗi tải danh sách:", err);
        const container = document.getElementById("project-list");
        if(container) container.innerHTML = `<p class="text-center text-danger">Không thể kết nối dữ liệu</p>`;
    });