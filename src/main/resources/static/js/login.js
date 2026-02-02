fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
})
    .then(res => {
        if (!res.ok) {
            throw new Error("Sai tài khoản hoặc mật khẩu");
        }
        return res.json();
    })
    .then(user => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", user.role); // QUAN TRỌNG
        window.location.href = "index.html";
    })
    .catch(err => {
        alert(err.message);
    });

function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error-msg");

    if (!username || !password) {
        errorMsg.style.display = "block";
        errorMsg.innerText = "Vui lòng nhập đầy đủ thông tin";
        return;
    }

    fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
        .then(res => {
            if (!res.ok) throw new Error("Login failed");
            return res.json();
        })
        .then(user => {
            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = "index.html";
        })
        .catch(() => {
            errorMsg.style.display = "block";
            errorMsg.innerText = "Sai tài khoản hoặc mật khẩu";
        });
}
