const API = "http://localhost:8080/api/contacts/admin";

// ================= LOAD DANH SÁCH =================
function loadContacts() {
    fetch(API, {
        headers: {
            "X-ROLE": "ADMIN"
        }
    })
        .then(res => {
            if (!res.ok) throw new Error("Forbidden");
            return res.json();
        })
        .then(data => {
            const body = document.getElementById("contactBody");
            body.innerHTML = "";

            if (!data || data.length === 0) {
                body.innerHTML = `
                    <tr>
                        <td colspan="7" class="text-center text-muted">
                            Chưa có liên hệ nào
                        </td>
                    </tr>
                `;
                return;
            }

            data.forEach(c => {
                body.innerHTML += `
                    <tr>
                        <td>${c.name}</td>
                        <td>${c.email}</td>
                        <td>${c.phone}</td>
                        <td style="max-width:300px">${c.message}</td>
                        <td>${new Date(c.createdAt).toLocaleString()}</td>
                        <td>
                            ${c.handled
                    ? '<span class="badge bg-success">Đã xử lý</span>'
                    : '<span class="badge bg-warning text-dark">Chưa xử lý</span>'}
                        </td>
                        <td>
                            ${!c.handled ? `
                                <button class="btn btn-sm btn-success"
                                        onclick="markHandled(${c.id})">✓</button>
                            ` : ""}
                            <button class="btn btn-sm btn-danger"
                                    onclick="removeContact(${c.id})">🗑</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(err => {
            alert("Không thể tải danh sách liên hệ");
            console.error(err);
        });
}

// ================= ĐÁNH DẤU ĐÃ XỬ LÝ =================
window.markHandled = function (id) {
    fetch(`${API}/${id}/handled`, {
        method: "PUT",
        headers: {
            "X-ROLE": "ADMIN"
        }
    })
        .then(res => {
            if (!res.ok) throw new Error("Update failed");
            loadContacts();
        })
        .catch(err => {
            alert("Không thể cập nhật trạng thái");
            console.error(err);
        });
};

// ================= XÓA LIÊN HỆ =================
window.removeContact = function (id) {
    if (!confirm("Xóa liên hệ này?")) return;

    fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
            "X-ROLE": "ADMIN"
        }
    })
        .then(res => {
            if (!res.ok) throw new Error("Delete failed");
            loadContacts();
        })
        .catch(err => {
            alert("Không thể xóa liên hệ");
            console.error(err);
        });
};

// ================= KHỞI CHẠY =================
loadContacts();
