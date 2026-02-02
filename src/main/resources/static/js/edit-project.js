// ================= AUTH =================
const user = JSON.parse(localStorage.getItem("user"));
if (!user || user.role !== "ADMIN") {
    alert("Bạn không có quyền!");
    location.href = "index.html";
}

// ================= PARAM =================
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const BASE_URL = window.location.origin;
const API = `${BASE_URL}/api/projects`;

// ================= LOAD PROJECT =================
fetch(`${API}/${id}`)
    .then(res => {
        if (!res.ok) throw new Error("Không tải được dự án");
        return res.json();
    })
    .then(p => {
        document.getElementById("name").value = p.name;
        document.getElementById("location").value = p.location;
        document.getElementById("description").value = p.description;
        document.getElementById("companyId").value = p.companyId; // 🔥 BẮT BUỘC
    })
    .catch(err => {
        alert("❌ Lỗi tải dữ liệu dự án");
        console.error(err);
    });

// ================= SAVE =================
function save() {

    const companyId = document.getElementById("companyId").value;

    if (!companyId) {
        alert("Vui lòng chọn chủ đầu tư");
        return;
    }

    const project = {
        name: document.getElementById("name").value,
        location: document.getElementById("location").value,
        description: document.getElementById("description").value,
        companyId: Number(companyId) // 🔥 BẮT BUỘC
    };

    fetch(`${API}/admin/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-ROLE": "ADMIN"
        },
        body: JSON.stringify(project)
    })
        .then(res => {
            if (!res.ok) throw new Error("Update failed");
            return res.json();
        })
        .then(() => {
            alert("✅ Cập nhật thành công");
            location.href = "admin-projects.html";
        })
        .catch(err => {
            alert("❌ Cập nhật thất bại");
            console.error(err);
        });
}
