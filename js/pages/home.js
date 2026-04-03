/* ================= HOME PAGE (FINAL FIXED + SYNCED) ================= */

document.addEventListener("DOMContentLoaded", () => {

    const bookList = document.getElementById("book-list");
    const topList = document.getElementById("top-selling");

    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const priceFilter = document.getElementById("priceFilter");

    if (!bookList || !window.BookService) return;

    /* ================= STATE ================= */

    let allBooks = BookService.getAllBooks() || [];
    let filteredBooks = [...allBooks];

    /* ================= RENDER ================= */

    function createBookCard(book) {

        const isWishlisted = window.WishlistService?.exists(book.id);

        return `
            <div class="book-card" data-id="${book.id}">
                
                <div class="card-top">
                    <i class="fa-heart ${isWishlisted ? "fa-solid active" : "fa-regular"} wishlist-btn"></i>
                </div>

                <img src="${book.img}" alt="${book.title}" loading="lazy">

                <h3>${book.title}</h3>
                <p>₹${book.price}</p>

                <div class="card-actions">
                    <button class="btn view-btn">View</button>
                    <button class="btn add-btn">Add</button>
                </div>
            </div>
        `;
    }

    function renderBooks(data, container = bookList) {
        if (!container) return;
        container.innerHTML = data.map(createBookCard).join("");
    }

    renderBooks(allBooks);

    /* ================= TOP SELLING ================= */

    if (topList) {
        renderBooks(allBooks.slice(0, 4), topList);
    }

    /* ================= EVENTS ================= */

    document.addEventListener("click", (e) => {

        /* ===== NAVIGATION FIX (IMPORTANT) ===== */
        if (e.target.closest(".cart")) {
            window.location.href = "cart.html";
            return;
        }

        if (e.target.closest(".wishlist") && !e.target.classList.contains("wishlist-btn")) {
            window.location.href = "wishlist.html";
            return;
        }

        const card = e.target.closest(".book-card");
        if (!card) return;

        const id = parseInt(card.dataset.id);
        const book = BookService.getBookById(id);

        if (!book) return;

        /* ===== ADD TO CART ===== */
        if (e.target.classList.contains("add-btn")) {
            window.CartService?.addItem(book);

            window.App?.showToast("Added to cart 🛒");

            // 🔥 force UI update
            document.dispatchEvent(new Event("cartUpdated"));
        }

        /* ===== VIEW ===== */
        if (e.target.classList.contains("view-btn")) {
            location.href = `product.html?id=${id}`;
        }

        /* ===== WISHLIST ===== */
        if (e.target.classList.contains("wishlist-btn")) {

            if (!window.WishlistService) return;

            const icon = e.target;

            const result = WishlistService.toggle(book);

            if (result === "removed") {
                icon.classList.remove("fa-solid", "active");
                icon.classList.add("fa-regular");
                window.App?.showToast("Removed from wishlist");
            } else {
                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid", "active");
                window.App?.showToast("Added to wishlist ❤️");
            }

            // 🔥 force UI update
            document.dispatchEvent(new Event("wishlistUpdated"));
        }

    });

    /* ================= SEARCH (DEBOUNCE) ================= */

    function debounce(fn, delay = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    }

    if (searchInput) {
        searchInput.addEventListener("input", debounce(applyFilters, 300));
    }

    /* ================= FILTERS ================= */

    categoryFilter?.addEventListener("change", applyFilters);
    priceFilter?.addEventListener("change", applyFilters);

    function applyFilters() {

        const searchVal = searchInput?.value.toLowerCase() || "";
        const categoryVal = categoryFilter?.value || "";
        const priceVal = priceFilter?.value || "";

        filteredBooks = allBooks.filter(book => {

            const matchSearch = book.title.toLowerCase().includes(searchVal);

            const matchCategory = categoryVal
                ? (book.category || "").includes(categoryVal)
                : true;

            return matchSearch && matchCategory;
        });

        /* ===== SORT ===== */

        if (priceVal === "low") {
            filteredBooks.sort((a, b) => a.price - b.price);
        }

        if (priceVal === "high") {
            filteredBooks.sort((a, b) => b.price - a.price);
        }

        renderBooks(filteredBooks);
    }

});