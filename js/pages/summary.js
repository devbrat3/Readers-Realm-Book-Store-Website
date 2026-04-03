/* ================= ORDER SUMMARY PAGE (FINAL OPTIMIZED) ================= */

document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("summary-items");
    const totalEl = document.getElementById("total-price");

    if (!container || !window.CartService) return;

    const cart = CartService.getCart();

    /* ================= EMPTY STATE ================= */

    if (!cart.length) {
        container.innerHTML = `
            <div class="empty">
                <h2>No items in cart 🛍️</h2>
                <p>Please add books before checkout</p>
            </div>
        `;
        totalEl.innerText = "₹0";
        return;
    }

    /* ================= RENDER ================= */

    let total = 0;

    container.innerHTML = cart.map(item => {

        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        return `
            <div class="summary-item">

                <!-- IMAGE -->
                <div class="summary-img">
                    <img src="${item.img}" alt="${item.title}">
                </div>

                <!-- DETAILS -->
                <div class="summary-details">
                    <h3>${item.title}</h3>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>

                <!-- TOTAL -->
                <div class="summary-price">
                    ₹${itemTotal}
                </div>

            </div>
        `;
    }).join("");

    totalEl.innerText = "₹" + total;

    /* ================= NAVIGATION ================= */

    window.goToPayment = () => {
        window.location.href = "payment.html";
    };

});