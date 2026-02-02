function login() {
    // 1. Lấy dữ liệu từ giao diện
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error-msg");

    // 2. Kiểm tra dữ liệu trống trước khi gửi
    if (!username || !password) {
        if (errorMsg) {
            errorMsg.style.display = "block";
            errorMsg.innerText = "Vui lòng nhập đầy đủ thông tin";
        } else {
            alert("Vui lòng nhập đầy đủ thông tin");
        }
        return;
    }

    // 3. TỰ ĐỘNG LẤY ĐỊA CHỈ SERVER (Localhost hoặc Railway)
    // Cách này giúp bạn không bao giờ phải sửa code khi đổi Host/Domain
    const API_BASE_URL = window.location.origin;

    // 4. Thực hiện gọi API
    fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            // Kiểm tra nếu phản hồi từ server là lỗi (401, 404, 500...)
            if (!response.ok) {
                throw new Error("Tài khoản hoặc mật khẩu không chính xác");
            }
            return response.json(); // Chuyển phản hồi sang dạng JSON
        })
        .then(user => {
            // 5. Lưu thông tin người dùng vào bộ nhớ trình duyệt
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("role", user.role);

            // 6. Chuyển hướng sang trang chủ sau khi đăng nhập thành công
            window.location.href = "index.html";
        })
        .catch(error => {
            // 7. Xử lý khi có lỗi (Sai pass, sập mạng, server lỗi...)
            if (errorMsg) {
                errorMsg.style.display = "block";
                errorMsg.innerText = error.message || "Không thể kết nối đến máy chủ";
            } else {
                alert(error.message);
            }
            console.error("Login failed:", error);
        });
}