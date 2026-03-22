document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("total-price");

    function render() {
        const cart = CartService.getCart();

        if (!container) return;

        if (!cart.length) {
            container.innerHTML = "<p>Your cart is empty</p>";
            return;
        }

        let total = 0;

        container.innerHTML = cart.map((item, i) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            return `
                <div class="cart-item">
                    <h3>${item.title}</h3>
                    <div>
                        <button onclick="changeQty(${i}, -1)">-</button>
                        ${item.quantity}
                        <button onclick="changeQty(${i}, 1)">+</button>
                    </div>
                    <p>₹${itemTotal}</p>
                    <button onclick="removeItem(${i})">Remove</button>
                </div>
            `;
        }).join("");

        totalEl.innerText = "₹" + total;
    }

    window.changeQty = (i, d) => {
        CartService.updateQuantity(i, d);
        render();
    };

    window.removeItem = (i) => {
        CartService.removeItem(i);
        render();
    };

    render();

});