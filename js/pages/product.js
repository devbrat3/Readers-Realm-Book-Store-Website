/* ================= PRODUCT PAGE (ULTIMATE REFINED) ================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= GET PRODUCT ================= */

    const params = new URLSearchParams(location.search);
    const id = parseInt(params.get("id"));

    const product = window.BookService?.getBookById(id);

    if (!product) {
        document.body.innerHTML = `
            <div style="text-align:center;margin-top:60px;">
                <h2>Product not found</h2>
                <p>Please go back and select a valid book</p>
            </div>
        `;
        return;
    }

    /* ================= DOM CACHE ================= */

    const imgEl = document.getElementById("product-img");
    const titleEl = document.getElementById("product-title");
    const priceEl = document.getElementById("product-price");
    const qtyEl = document.getElementById("qty");

    /* ================= SET DATA ================= */

    imgEl.src = product.img;
    imgEl.alt = product.title;
    imgEl.loading = "lazy";

    titleEl.textContent = product.title;
    priceEl.textContent = `₹${product.price}`;

    /* ================= STATE ================= */

    let qty = 1;

    /* ================= QUANTITY ================= */

    window.changeQty = (delta) => {
        qty = Math.max(1, qty + delta);
        qtyEl.textContent = qty;
    };

    /* ================= ADD TO CART ================= */

    window.addToCart = () => {

        if (!window.CartService) return;

        CartService.addItem(product, qty);

        // 🔥 Sync navbar instantly
        document.dispatchEvent(new Event("cartUpdated"));

        // 🔥 UX feedback
        window.App?.showToast("Added to cart 🛒");

        // 🔥 Micro interaction (optional but premium feel)
        animateAddToCart();
    };

    /* ================= NAVIGATION ================= */

    window.goToCart = () => {
        window.location.href = "cart.html";
    };

    /* ================= UX ENHANCEMENTS ================= */

    function animateAddToCart() {

        if (!imgEl) return;

        const clone = imgEl.cloneNode(true);

        const rect = imgEl.getBoundingClientRect();

        Object.assign(clone.style, {
            position: "fixed",
            top: rect.top + "px",
            left: rect.left + "px",
            width: rect.width + "px",
            height: rect.height + "px",
            zIndex: "9999",
            transition: "all 0.6s ease-in-out",
            borderRadius: "12px"
        });

        document.body.appendChild(clone);

        const cartIcon = document.querySelector(".cart");

        if (!cartIcon) return;

        const cartRect = cartIcon.getBoundingClientRect();

        requestAnimationFrame(() => {
            clone.style.top = cartRect.top + "px";
            clone.style.left = cartRect.left + "px";
            clone.style.width = "30px";
            clone.style.height = "30px";
            clone.style.opacity = "0.5";
        });

        setTimeout(() => clone.remove(), 650);
    }

});