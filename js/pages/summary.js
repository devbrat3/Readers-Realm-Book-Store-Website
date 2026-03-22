document.addEventListener("DOMContentLoaded", () => {

    const cart = CartService.getCart();
    const container = document.getElementById("summary-items");

    let total = 0;

    container.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        return `
            <div class="summary-item">
                <h3>${item.title}</h3>
                <p>₹${item.price} × ${item.quantity}</p>
                <span>₹${itemTotal}</span>
            </div>
        `;
    }).join("");

    document.getElementById("total-price").innerText = "₹" + total;

    window.goToPayment = () => location.href = "payment.html";

});