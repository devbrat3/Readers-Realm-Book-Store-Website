document.addEventListener("DOMContentLoaded", () => {

    const id = parseInt(new URLSearchParams(location.search).get("id"));
    const product = BookService.getBookById(id);

    if (!product) return;

    document.getElementById("product-img").src = product.img;
    document.getElementById("product-title").innerText = product.title;
    document.getElementById("product-price").innerText = "₹" + product.price;

    let qty = 1;

    window.changeQty = (v) => {
        qty += v;
        if (qty < 1) qty = 1;
        document.getElementById("qty").innerText = qty;
    };

    window.addToCart = () => {
        for (let i = 0; i < qty; i++) {
            CartService.addItem(product);
        }
        showToast("Added to cart");
    };

    window.goToCart = () => location.href = "cart.html";

});