const OrderService = {

    placeOrder(user, cart) {
        let orders = JSON.parse(localStorage.getItem("orders")) || [];

        const order = {
            id: Date.now(),
            user,
            cart,
            total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
            date: new Date()
        };

        orders.push(order);

        localStorage.setItem("orders", JSON.stringify(orders));

        return order;
    },

    getOrders() {
        return JSON.parse(localStorage.getItem("orders")) || [];
    }

};

window.OrderService = OrderService;