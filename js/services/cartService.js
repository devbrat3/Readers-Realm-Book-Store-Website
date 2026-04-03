/* ================= CART SERVICE (FINAL OPTIMIZED) ================= */

const CartService = (() => {

    const KEY = "cart";

    /* ================= PRIVATE ================= */

    function getData() {
        try {
            return JSON.parse(localStorage.getItem(KEY)) || [];
        } catch {
            return [];
        }
    }

    function saveData(data) {
        localStorage.setItem(KEY, JSON.stringify(data));

        // 🔥 Notify UI globally
        document.dispatchEvent(new Event("cartUpdated"));
    }

    function findItem(cart, id) {
        return cart.find(item => item.id === id);
    }

    /* ================= PUBLIC ================= */

    return {

        /* ===== GET CART ===== */
        getCart() {
            return getData();
        },

        /* ===== ADD ITEM ===== */
        addItem(book, qty = 1) {

            if (!book || !book.id) return;

            const cart = getData();
            const existing = findItem(cart, book.id);

            if (existing) {
                existing.quantity += qty;
            } else {
                cart.push({
                    id: book.id,
                    title: book.title,
                    price: book.price,
                    img: book.img,
                    quantity: qty
                });
            }

            saveData(cart);
        },

        /* ===== REMOVE ITEM ===== */
        removeItem(id) {

            let cart = getData();
            cart = cart.filter(item => item.id !== id);

            saveData(cart);
        },

        /* ===== UPDATE QTY ===== */
        updateQuantity(id, delta) {

            const cart = getData();
            const item = findItem(cart, id);

            if (!item) return;

            item.quantity += delta;

            if (item.quantity <= 0) {
                this.removeItem(id);
                return;
            }

            saveData(cart);
        },

        /* ===== SET QUANTITY (NEW - PREMIUM) ===== */
        setQuantity(id, qty) {

            const cart = getData();
            const item = findItem(cart, id);

            if (!item) return;

            if (qty <= 0) {
                this.removeItem(id);
                return;
            }

            item.quantity = qty;
            saveData(cart);
        },

        /* ===== CLEAR CART ===== */
        clearCart() {
            localStorage.removeItem(KEY);
            document.dispatchEvent(new Event("cartUpdated"));
        },

        /* ===== TOTAL PRICE ===== */
        getTotal() {
            return getData().reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );
        },

        /* ===== TOTAL COUNT ===== */
        getCount() {
            return getData().reduce(
                (sum, item) => sum + item.quantity,
                0
            );
        },

        /* ===== EXISTS ===== */
        exists(id) {
            return !!findItem(getData(), id);
        }

    };

})();

/* ===== GLOBAL ACCESS ===== */
window.CartService = CartService;