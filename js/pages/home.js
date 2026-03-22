/* ================= HOME PAGE ================= */

document.addEventListener("DOMContentLoaded", () => {

    const bookList = document.getElementById("book-list");
    const searchInput = document.querySelector(".search-box input");

    if (!bookList) return;

    function renderBooks(data) {
        bookList.innerHTML = data.map(book => `
            <div class="book-card" data-id="${book.id}">
                <img src="${book.img}">
                <h3>${book.title}</h3>
                <p>₹${book.price}</p>

                <div class="card-actions">
                    <button class="btn view-btn">View</button>
                    <button class="btn add-btn">Add</button>
                </div>
            </div>
        `).join("");
    }

    renderBooks(BookService.getAllBooks());

    /* ADD / VIEW */
    document.addEventListener("click", e => {

        const card = e.target.closest(".book-card");
        if (!card) return;

        const id = parseInt(card.dataset.id);
        const book = BookService.getBookById(id);

        if (e.target.classList.contains("add-btn")) {
            CartService.addItem(book);
            showToast("Added to cart");
        }

        if (e.target.classList.contains("view-btn")) {
            location.href = `product.html?id=${id}`;
        }
    });

    /* SEARCH */
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const value = searchInput.value.toLowerCase();

            const filtered = BookService.getAllBooks().filter(b =>
                b.title.toLowerCase().includes(value)
            );

            renderBooks(filtered);
        });
    }

});