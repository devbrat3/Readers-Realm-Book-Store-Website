/* ================= WISHLIST SERVICE (FINAL OPTIMIZED) ================= */

const WishlistService = (() => {

    const KEY = "wishlist";

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
        emitUpdate();
    }

    function emitUpdate() {
        document.dispatchEvent(new Event("wishlistUpdated"));
    }

    function findItem(list, id) {
        return list.find(item => item.id === id);
    }

    /* ================= PUBLIC ================= */

    return {

        /* ===== GET ALL ===== */
        getAll() {
            return getData();
        },

        /* ===== ADD ===== */
        add(book) {

            if (!book || !book.id) return false;

            const wishlist = getData();
            const exists = findItem(wishlist, book.id);

            if (exists) return false;

            wishlist.push({
                id: book.id,
                title: book.title,
                price: book.price,
                img: book.img
            });

            saveData(wishlist);
            return true;
        },

        /* ===== REMOVE ===== */
        remove(id) {

            let wishlist = getData();
            wishlist = wishlist.filter(item => item.id !== id);

            saveData(wishlist);
        },

        /* ===== TOGGLE ===== */
        toggle(book) {

            if (!book || !book.id) return;

            if (this.exists(book.id)) {
                this.remove(book.id);
                return "removed";
            } else {
                this.add(book);
                return "added";
            }
        },

        /* ===== EXISTS ===== */
        exists(id) {
            return !!findItem(getData(), id);
        },

        /* ===== CLEAR ===== */
        clear() {
            localStorage.removeItem(KEY);
            emitUpdate();
        },

        /* ===== COUNT ===== */
        getCount() {
            return getData().length;
        }

    };

})();

/* ===== GLOBAL ACCESS ===== */
window.WishlistService = WishlistService;