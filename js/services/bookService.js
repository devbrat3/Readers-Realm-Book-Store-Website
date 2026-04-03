/* ================= BOOK SERVICE (FINAL OPTIMIZED) ================= */

const BookService = (() => {

    const KEY = "books";

    /* ================= PRIVATE ================= */

    function getLocal() {
        return JSON.parse(localStorage.getItem(KEY)) || [];
    }

    function setLocal(data) {
        localStorage.setItem(KEY, JSON.stringify(data));
    }

    function seedIfEmpty() {
        const existing = getLocal();

        if (!existing.length && window.books?.length) {
            setLocal(window.books);
            return window.books;
        }

        return existing;
    }

    /* ================= PUBLIC ================= */

    return {

        /* ===== GET ALL ===== */
        getAllBooks() {
            return seedIfEmpty();
        },

        /* ===== GET BY ID ===== */
        getBookById(id) {
            return seedIfEmpty().find(b => b.id === id);
        },

        /* ===== SEARCH ===== */
        search(query) {
            const q = query.toLowerCase();
            return seedIfEmpty().filter(book =>
                book.title.toLowerCase().includes(q)
            );
        },

        /* ===== FILTER ===== */
        filterByCategory(category) {
            return seedIfEmpty().filter(book =>
                (book.category || "").includes(category)
            );
        },

        /* ===== SORT ===== */
        sortByPrice(order = "low") {
            const books = [...seedIfEmpty()];

            return books.sort((a, b) =>
                order === "low"
                    ? a.price - b.price
                    : b.price - a.price
            );
        },

        /* ===== ADD (ADMIN USE) ===== */
        addBook(book) {
            const books = seedIfEmpty();

            books.push({
                id: Date.now(),
                ...book
            });

            setLocal(books);
        },

        /* ===== CLEAR ===== */
        clear() {
            localStorage.removeItem(KEY);
        }

    };

})();

/* ================= GLOBAL ================= */

window.BookService = BookService;