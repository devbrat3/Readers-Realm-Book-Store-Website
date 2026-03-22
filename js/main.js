/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
    initMenu();
    initCartUI();
    updateAuthUI();
});


/* ================= MOBILE MENU ================= */
function initMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    // Close menu on link click (better UX)
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });
    });
}


/* ================= CART ================= */
function initCartUI() {
    updateCartUI();
}

function updateCartUI() {
    const cartDisplay = document.querySelector(".cart-count");
    if (!cartDisplay) return;

    // Prefer CartService (future backend ready)
    let cart = [];

    if (window.CartService) {
        cart = CartService.getCart();
    } else {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
    }

    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartDisplay.textContent = totalQty;
}


/* ================= NAVIGATION ================= */
function goToCart() {
    window.location.href = "cart.html";
}


/* ================= AUTH UI ================= */
function updateAuthUI() {

    const authArea = document.getElementById("auth-area");
    if (!authArea || !window.AuthService) return;

    const user = AuthService.getCurrentUser();

    if (user) {
        authArea.innerHTML = `
            <span class="user-name">Hi, ${user.name}</span>
            <button class="btn" onclick="logout()">Logout</button>
        `;
    } else {
        authArea.innerHTML = `
            <a href="login.html" class="btn">Login</a>
        `;
    }
}

function logout() {
    if (window.AuthService) {
        AuthService.logout();
    }
    location.reload();
}


/* ================= TOAST (GLOBAL UX) ================= */
function showToast(message) {

    const toast = document.createElement("div");
    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.background = "#089da1";
    toast.style.color = "#fff";
    toast.style.padding = "10px 15px";
    toast.style.borderRadius = "6px";
    toast.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
    toast.style.zIndex = "999";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2000);
}