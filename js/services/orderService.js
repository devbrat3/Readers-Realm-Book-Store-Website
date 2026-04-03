/* ================= ORDER SERVICE ================= */

const OrderService = (() => {

    const KEY = "orders";

    /* ================= PRIVATE ================= */

    function getData() {
        return JSON.parse(localStorage.getItem(KEY)) || [];
    }

    function saveData(data) {
        localStorage.setItem(KEY, JSON.stringify(data));

        // 🔥 Notify UI
        document.dispatchEvent(new Event("orderUpdated"));
    }

    /* ================= PUBLIC ================= */

    return {

        /* ===== CREATE ORDER ===== */
        createOrder({ items, user = {}, total = 0, paymentMethod = "Unknown" }) {

            const orders = getData();

            const order = {
                id: Date.now(),

                items: items.map(item => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity
                })),

                user: {
                    name: user.name || "Guest",
                    address: user.address || "",
                    phone: user.phone || ""
                },

                total,
                paymentMethod,

                status: "Placed",

                date: new Date().toISOString()
            };

            orders.push(order);

            saveData(orders);

            return order;
        },

        /* ===== GET ALL ORDERS ===== */
        getOrders() {
            return getData().reverse(); // latest first
        },

        /* ===== GET BY ID ===== */
        getOrderById(id) {
            return getData().find(o => o.id === id);
        },

        /* ===== GET USER ORDERS ===== */
        getUserOrders(name) {
            return this.getOrders().filter(o => o.user.name === name);
        },

        /* ===== UPDATE STATUS ===== */
        updateStatus(id, status) {

            const orders = getData();

            const order = orders.find(o => o.id === id);

            if (!order) return;

            order.status = status;

            saveData(orders);
        },

        /* ===== CLEAR ALL ===== */
        clearOrders() {
            localStorage.removeItem(KEY);
            document.dispatchEvent(new Event("orderUpdated"));
        }

    };

})();

/* ===== GLOBAL ACCESS ===== */
window.OrderService = OrderService;