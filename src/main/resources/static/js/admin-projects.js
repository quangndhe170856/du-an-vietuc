// ================= AUTH =================
const user = JSON.parse(localStorage.getItem("user"));
if (!user || user.role !== "ADMIN") {
    alert("Bạn không có quyền truy cập!");
    location.href = "index.html";
}

// ================= API =================
const BASE_URL = window.location.origin;
const API = `${BASE_URL}/api/projects`;

// ================= LOAD PROJECTS =================
function loadProjects() {
    fetch(API, {
        headers: { "X-ROLE": "ADMIN" }
    })
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("project-table");
            tbody.innerHTML = "";

            data.forEach(p => {
                tbody.innerHTML += `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.name}</td>
                        <td>${p.location}</td>
                        <td>${p.companyName || "-"}</td>
                        <td class="d-flex gap-2">
                            <button class="btn btn-warning btn-sm"
                                    onclick="editProject(${p.id})">
                                ✏️ Sửa
                            </button>
                            <button class="btn btn-danger btn-sm"
                                    onclick="deleteProject(${p.id})">
                                🗑 Xoá
                            </button>
                        </td>
                    </tr>
                `;
            });
        });
}

loadProjects();

// ================= ADD PROJECT (Đã sửa logic Async/Await) =================
document.getElementById("addForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = e.target.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Đang xử lý...`;

    const project = {
        name: document.getElementById("name").value,
        location: document.getElementById("location").value,
        description: document.getElementById("description").value,
        companyId: document.getElementById("companyId").value
    };

    try {
        // Bước 1: Tạo dự án và đợi lấy ID về
        const res = await fetch(`${API}/admin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-ROLE": "ADMIN"
            },
            body: JSON.stringify(project)
        });

        if (!res.ok) throw new Error("Không thể tạo thông tin dự án");
        const newProject = await res.json();

        // Bước 2: Kiểm tra nếu có file ảnh thì mới upload
        const fileInput = document.getElementById("gallery");
        if (fileInput.files.length > 0) {
            const formData = new FormData();
            [...fileInput.files].forEach(f => formData.append("files", f));

            const imgRes = await fetch(`${API}/admin/${newProject.id}/images`, {
                method: "POST",
                headers: { "X-ROLE": "ADMIN" },
                body: formData
            });

            if (!imgRes.ok) throw new Error("Dự án đã tạo nhưng lỗi upload ảnh");
        }

        // Bước 3: Hoàn tất
        alert("✅ Thêm dự án và ảnh thành công!");
        location.reload();

    } catch (err) {
        alert("❌ Thất bại: " + err.message);
        btn.disabled = false;
        btn.innerHTML = "Lưu";
    }
});

// Chú ý: Hàm uploadGallery cũ đã được tích hợp vào sự kiện submit ở trên để tránh chạy 2 lần

// ================= DELETE =================
function deleteProject(id) {
    if (!confirm("Xoá dự án này?")) return;

    fetch(`${API}/admin/${id}`, {
        method: "DELETE",
        headers: { "X-ROLE": "ADMIN" }
    })
        .then(res => {
            if (res.ok) {
                loadProjects();
            } else {
                alert("Không thể xóa dự án này");
            }
        })
        .catch(err => console.error("Lỗi xóa:", err));
}

// ================= EDIT =================
function editProject(id) {
    window.location.href = `edit-project.html?id=${id}`;
}