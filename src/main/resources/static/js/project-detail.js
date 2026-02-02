const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Hàm bổ trợ để xử lý URL ảnh linh hoạt
const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/800x400?text=No+Image"; // Ảnh mặc định nếu trống
    // Nếu url bắt đầu bằng http (Cloudinary) thì giữ nguyên, ngược lại thì nối localhost
    return url.startsWith("http") ? url : `http://localhost:8080${url}`;
};

fetch(`http://localhost:8080/api/projects/${id}`)
    .then(res => {
        if (!res.ok) throw new Error("Không tìm thấy dự án");
        return res.json();
    })
    .then(p => {

        /* ===== 1. HERO SECTION ===== */
        const heroImage = p.heroImage || (p.images?.length ? p.images[0] : null);
        if (heroImage) {
            document.getElementById("projectHero").style.backgroundImage =
                `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${getImageUrl(heroImage)}')`;
        }

        document.getElementById("project-name").innerText = p.name || "N/A";
        document.getElementById("project-location").innerText = p.location || "N/A";

        /* ===== 2. OVERVIEW INFO ===== */
        document.getElementById("overview-location").innerText = p.location || "N/A";
        document.getElementById("overview-company").innerText = p.companyName || "N/A";
        document.getElementById("project-description").innerText = p.description || "Đang cập nhật...";

        /* ===== 3. COMPANY LOGO & INFO ===== */
        const logoImg = document.getElementById("company-logo");
        logoImg.src = getImageUrl(p.companyLogo);
        logoImg.onerror = () => logoImg.src = "https://via.placeholder.com/150?text=Logo";

        document.getElementById("company-name").innerText = p.companyName || "Chưa xác định";

        /* ===== 4. SLIDER (CAROUSEL) ===== */
        const gallery = document.getElementById("gallery-inner");
        gallery.innerHTML = "";

        if (p.images && p.images.length > 0) {
            p.images.forEach((img, index) => {
                gallery.innerHTML += `
                    <div class="carousel-item ${index === 0 ? "active" : ""}">
                      <img src="${getImageUrl(img)}"
                           class="d-block w-100"
                           style="height:450px; object-fit:cover"
                           alt="Project image ${index + 1}">
                    </div>
                `;
            });
        } else {
            gallery.innerHTML = '<div class="carousel-item active"><img src="https://via.placeholder.com/800x400?text=No+Gallery+Images" class="d-block w-100"></div>';
        }

        /* ===== 5. IMAGE GRID (TAB HÌNH ẢNH) ===== */
        const grid = document.getElementById("image-grid");
        grid.innerHTML = "";

        if (p.images && p.images.length > 0) {
            p.images.forEach(img => {
                grid.innerHTML += `
                    <div class="col-md-4 mb-3">
                      <div class="ratio ratio-4x3">
                        <img src="${getImageUrl(img)}"
                             class="img-fluid rounded shadow-sm object-fit-cover"
                             style="cursor: pointer"
                             onclick="window.open('${getImageUrl(img)}', '_blank')">
                      </div>
                    </div>
                `;
            });
        } else {
            grid.innerHTML = '<p class="text-center w-100">Không có hình ảnh chi tiết.</p>';
        }

    })
    .catch(err => {
        console.error("Lỗi:", err);
        alert("Không thể tải thông tin dự án. Vui lòng kiểm tra lại kết nối!");
    });