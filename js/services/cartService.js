const CartService = {

    getCart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    },

    saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    },

    addItem(book) {
        let cart = this.getCart();

        const existing = cart.find(item => item.id === book.id);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...book, quantity: 1 });
        }

        this.saveCart(cart);
    },

    removeItem(index) {
        let cart = this.getCart();
        cart.splice(index, 1);
        this.saveCart(cart);
    },

    updateQuantity(index, delta) {
        let cart = this.getCart();
        cart[index].quantity += delta;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

        this.saveCart(cart);
    },

    clearCart() {
        localStorage.removeItem("cart");
    },

    getTotal() {
        let cart = this.getCart();
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
};

window.CartService = CartService;