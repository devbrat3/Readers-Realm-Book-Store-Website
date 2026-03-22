document.addEventListener("DOMContentLoaded", () => {

    let selected = "";

    window.selectMethod = (el, method) => {
        selected = method;

        document.querySelectorAll(".method").forEach(m => {
            m.classList.remove("active");
        });

        el.classList.add("active");
    };

    window.pay = () => {

        if (!selected) {
            alert("Select payment method");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user")) || {};
        const cart = CartService.getCart();

        OrderService.placeOrder(user, cart);

        CartService.clearCart();

        alert("Payment Successful");

        location.href = "index.html";
    };

});