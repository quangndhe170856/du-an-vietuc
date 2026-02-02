document.addEventListener("DOMContentLoaded", () => {

    function getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    function logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        location.href = "index.html";
    }

    const navbar = document.getElementById("navbar-menu");
    if (!navbar) return;

    const user = getCurrentUser();
    const currentPath = window.location.pathname.split("/").pop();

    function navItem(href, label) {
        const active = currentPath === href
            ? "active fw-bold text-warning"
            : "";
        return `
            <li class="nav-item">
                <a class="nav-link ${active}" href="${href}">
                    ${label}
                </a>
            </li>
        `;
    }

    let html = "";
    html += navItem("index.html", "Trang chủ");
    html += navItem("company.html", "Giới thiệu");
    html += navItem("projects.html", "Dự án");
    html += navItem("contact.html", "Liên hệ");

    // ===== ADMIN MENU =====
    if (user && user.role === "ADMIN") {
        html += `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle text-warning fw-bold"
                   href="#"
                   role="button"
                   data-bs-toggle="dropdown">
                    Quản trị
                </a>
                <ul class="dropdown-menu dropdown-menu-dark">
                    <li>
                        <a class="dropdown-item" href="admin-projects.html">
                            Quản lý dự án
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="admin-contact.html">
                            Quản lý liên hệ
                        </a>
                    </li>
                </ul>
            </li>
        `;
    }

    // ===== LOGIN / LOGOUT =====
    if (user) {
        html += `
            <li class="nav-item">
                <a class="nav-link text-danger" href="#" onclick="logout()">
                    Đăng xuất
                </a>
            </li>
        `;
    } else {
        html += `
            <li class="nav-item">
                <a class="nav-link" href="login.html">
                    Đăng nhập
                </a>
            </li>
        `;
    }

    navbar.innerHTML = html;
    window.logout = logout;
});
