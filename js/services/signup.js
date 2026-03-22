function signup() {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    /* ================= VALIDATION ================= */

    if (!name || !email || !password || !confirmPassword) {
        showToast("Please fill all fields ❗");
        return;
    }

    if (!email.includes("@")) {
        showToast("Enter valid email ❗");
        return;
    }

    if (password.length < 6) {
        showToast("Password must be at least 6 characters ❗");
        return;
    }

    if (password !== confirmPassword) {
        showToast("Passwords do not match ❗");
        return;
    }

    /* ================= REGISTER ================= */

    const res = AuthService.register({ name, email, password });

    if (!res.success) {
        showToast(res.message);
        return;
    }

    showToast("Account created successfully 🎉");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1200);
}


/* ================= TOGGLE PASSWORD ================= */

function togglePassword(id) {
    const field = document.getElementById(id);
    field.type = field.type === "password" ? "text" : "password";
}