function login() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        showToast("Please fill all fields ❗");
        return;
    }

    const res = AuthService.login(email, password);

    if (!res.success) {
        showToast(res.message);
        return;
    }

    showToast("Login successful ✅");

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
}

/* ================= TOGGLE PASSWORD ================= */
function togglePassword() {
    const pass = document.getElementById("password");
    pass.type = pass.type === "password" ? "text" : "password";
}