/* ================= PAYMENT PAGE (FINAL OPTIMIZED) ================= */

document.addEventListener("DOMContentLoaded", () => {

    let selectedMethod = "";

    const methods = document.querySelectorAll(".method");

    /* ================= SELECT METHOD ================= */

    methods.forEach(el => {
        el.addEventListener("click", () => {

            selectedMethod = el.dataset.method;

            methods.forEach(m => m.classList.remove("active"));
            el.classList.add("active");

        });
    });

    /* ================= PAYMENT ================= */

    window.pay = () => {

        if (!selectedMethod) {
            window.App?.showToast("Select payment method ⚠️", "warning");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user")) || {};
        const cart = CartService.getCart();

        if (!cart.length) {
            window.App?.showToast("Cart is empty 🛍️", "error");
            return;
        }

        /* ================= PLACE ORDER ================= */

        const order = OrderService.placeOrder({
            ...user,
            paymentMethod: selectedMethod
        }, cart);

        /* ================= CLEAR CART ================= */

        CartService.clearCart();

        /* ================= SUCCESS ================= */

        window.App?.showToast("Payment Successful ✅");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1200);

    };

});