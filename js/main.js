/* ================= APP (GLOBAL CONTROLLER - FINAL FIXED) ================= */

const App = (() => {

    /* ================= INIT ================= */

    function init() {
        UI.initMenu();
        UI.initCart();
        UI.initWishlist();
        UI.initAuth();
        UI.initNavigation(); // ✅ FIXED (important)
    }


    /* ================= UI MODULE ================= */

    const UI = {

        /* ===== MENU ===== */
        initMenu() {
            const toggle = document.querySelector(".menu-toggle");
            const nav = document.querySelector(".nav-links");

            if (!toggle || !nav) return;

            toggle.addEventListener("click", () => {
                nav.classList.toggle("active");
            });

            document.querySelectorAll(".nav-links a").forEach(link => {
                link.addEventListener("click", () => nav.classList.remove("active"));
            });

            document.addEventListener("click", (e) => {
                if (!nav.contains(e.target) && !toggle.contains(e.target)) {
                    nav.classList.remove("active");
                }
            });

            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape") nav.classList.remove("active");
            });
        },


        /* ===== NAVIGATION (🔥 FIXED CORE ISSUE) ===== */
        initNavigation() {

            const cartBtn = document.querySelector(".cart");
            const wishlistBtn = document.querySelector(".wishlist");

            if (cartBtn) {
                cartBtn.addEventListener("click", () => {
                    window.location.href = "cart.html";
                });
            }

            if (wishlistBtn) {
                wishlistBtn.addEventListener("click", () => {
                    window.location.href = "wishlist.html";
                });
            }
        },


        /* ===== CART ===== */
        initCart() {
            this.updateCart();

            document.addEventListener("cartUpdated", () => {
                this.updateCart();
            });
        },

        updateCart() {
            const el = document.querySelector(".cart-count");
            if (!el) return;

            const cart = window.CartService
                ? CartService.getCart()
                : JSON.parse(localStorage.getItem("cart")) || [];

            const total = cart.reduce((sum, i) => sum + i.quantity, 0);
            el.textContent = total;
        },


        /* ===== WISHLIST ===== */
        initWishlist() {
            this.updateWishlist();

            document.addEventListener("wishlistUpdated", () => {
                this.updateWishlist();
            });
        },

        updateWishlist() {
            const el = document.querySelector(".wishlist-count");
            if (!el || !window.WishlistService) return;

            el.textContent = WishlistService.getCount();
        },


        /* ===== AUTH ===== */
        initAuth() {
            this.renderAuth();
        },

        renderAuth() {
            const authArea = document.getElementById("auth-area");
            if (!authArea || !window.AuthService) return;

            const user = AuthService.getCurrentUser();

            if (user) {
                authArea.innerHTML = `
                    <div class="auth-user">
                        <span class="user-name">Hi, ${user.name}</span>
                        <button class="btn logout-btn">Logout</button>
                    </div>
                `;

                authArea.querySelector(".logout-btn")
                    .addEventListener("click", Actions.logout);

            } else {
                authArea.innerHTML = `
                    <a href="login.html" class="btn">Login</a>
                `;
            }
        }
    };


    /* ================= ACTIONS ================= */

    const Actions = {

        goToCart() {
            window.location.href = "cart.html";
        },

        goToWishlist() {
            window.location.href = "wishlist.html";
        },

        logout() {
            AuthService?.logout();
            Toast.show("Logged out successfully");

            setTimeout(() => location.reload(), 700);
        }
    };


    /* ================= TOAST SYSTEM ================= */

    const Toast = {

        show(message, type = "success") {

            const colors = {
                success: "#089da1",
                error: "#ef4444",
                warning: "#f59e0b"
            };

            const el = document.createElement("div");
            el.className = "toast";
            el.innerText = message;

            Object.assign(el.style, {
                position: "fixed",
                bottom: "20px",
                right: "20px",
                background: colors[type] || colors.success,
                color: "#fff",
                padding: "12px 18px",
                borderRadius: "8px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                zIndex: "9999",
                opacity: "0",
                transform: "translateY(20px)",
                transition: "all 0.3s ease"
            });

            document.body.appendChild(el);

            requestAnimationFrame(() => {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            });

            setTimeout(() => {
                el.style.opacity = "0";
                el.style.transform = "translateY(20px)";
                setTimeout(() => el.remove(), 300);
            }, 2500);
        }
    };


    /* ================= PUBLIC API ================= */

    return {
        init,
        goToCart: Actions.goToCart,
        goToWishlist: Actions.goToWishlist,
        showToast: Toast.show
    };

})();


/* ================= START ================= */

document.addEventListener("DOMContentLoaded", App.init);