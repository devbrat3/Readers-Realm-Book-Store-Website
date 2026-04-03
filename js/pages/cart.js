/* ================= CART PAGE (FINAL CLEAN + UI FIXED) ================= */

document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("total-price");
    const countEl = document.getElementById("item-count");

    if (!container) return;

    /* ================= RENDER ================= */

    function render() {

        const cart = CartService.getCart();

        if (!cart.length) {
            container.innerHTML = `
                <div class="empty">
                    <h2>Your cart is empty 🛍️</h2>
                    <p>Add some books to get started</p>
                </div>
            `;
            totalEl.innerText = "₹0";
            if (countEl) countEl.innerText = "0";
            return;
        }

        let total = 0;
        let count = 0;

        container.innerHTML = cart.map((item, i) => {

            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            count += item.quantity;

            return `
                <div class="cart-item">

                    <!-- IMAGE -->
                    <div class="cart-img">
                        <img src="${item.img}" alt="${item.title}">
                    </div>

                    <!-- DETAILS -->
                    <div class="cart-details">
                        <h3>${item.title}</h3>
                        <p class="cart-price">₹${item.price}</p>

                        <div class="cart-actions">
                            <button onclick="changeQty(${i}, -1)">−</button>
                            <span>${item.quantity}</span>
                            <button onclick="changeQty(${i}, 1)">+</button>
                        </div>
                    </div>

                    <!-- TOTAL -->
                    <div class="cart-total">
                        ₹${itemTotal}
                    </div>

                    <!-- REMOVE -->
                    <button class="remove-btn" onclick="removeItem(${i})">
                        ✕
                    </button>

                </div>
            `;
        }).join("");

        totalEl.innerText = "₹" + total;
        if (countEl) countEl.innerText = count;
    }

    /* ================= ACTIONS ================= */

    window.changeQty = (index, delta) => {
        CartService.updateQuantity(index, delta);
        render();

        // 🔥 sync navbar
        document.dispatchEvent(new Event("cartUpdated"));
    };

    window.removeItem = (index) => {
        CartService.removeItem(index);
        render();

        // 🔥 sync navbar
        document.dispatchEvent(new Event("cartUpdated"));
    };

    /* ================= INIT ================= */

    render();

});