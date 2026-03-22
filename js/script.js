/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {

    initMenu();
    initBooks();
    initCartUI();
    initSearch();

});

/* ================= MOBILE MENU ================= */
function initMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("active");
        });
    }
}

/* ================= NAVIGATION ================= */
function goToCart() {
    window.location.href = "cart.html";
}

/* ================= BOOK DATA ================= */
const books = [
    { id: 1, img: "images/book_1.jpg", title: "Book 1", price: 399 },
    { id: 2, img: "images/book_2.jpg", title: "Book 2", price: 399 },
    { id: 3, img: "images/book_3.jpg", title: "Book 3", price: 399 },
    { id: 4, img: "images/book_4.jpg", title: "Book 4", price: 399 },
    { id: 5, img: "images/book_5.jpg", title: "Book 5", price: 399 },
    { id: 6, img: "images/book_6.jpg", title: "Book 6", price: 399 },
    { id: 7, img: "images/book_7.png", title: "Book 7", price: 399 },
    { id: 8, img: "images/book_8.png", title: "Book 8", price: 399 },
    { id: 9, img: "images/book_9.jpg", title: "Book 9", price: 399 },
    { id: 10, img: "images/book_10.png", title: "Book 10", price: 399 },
    { id: 11, img: "images/book_11.jpg", title: "Book 11", price: 399 },
    { id: 12, img: "images/book_12.png", title: "Book 12", price: 399 },
    { id: 13, img: "images/book_13.png", title: "Book 13", price: 399 },
    { id: 14, img: "images/book_14.png", title: "Book 14", price: 399 },
    { id: 15, img: "images/book_15.png", title: "Book 15", price: 399 }
];

/* 🔥 Store globally for product page */
localStorage.setItem("books", JSON.stringify(books));

/* ================= BOOK RENDER ================= */
function initBooks() {
    const bookList = document.getElementById("book-list");
    if (!bookList) return;

    renderBooks(books);
}

function renderBooks(data) {
    const bookList = document.getElementById("book-list");
    if (!bookList) return;

    bookList.innerHTML = data.map(book => `
        <div class="book-card" data-id="${book.id}">
            <img src="${book.img}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>₹${book.price}</p>

            <div class="card-actions">
                <button class="btn view-btn">View</button>
                <button class="btn add-to-cart">Add</button>
            </div>
        </div>
    `).join("");
}

/* ================= CART ================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function initCartUI() {
    updateCartUI();
}

function updateCartUI() {
    const cartDisplay = document.querySelector(".cart-count");
    if (!cartDisplay) return;

    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartDisplay.textContent = totalQty;
}

/* ================= EVENTS ================= */
document.addEventListener("click", function (e) {

    /* ===== CART CLICK ===== */
    if (e.target.closest(".cart")) {
        goToCart();
        return;
    }

    const card = e.target.closest(".book-card");
    if (!card) return;

    const id = parseInt(card.dataset.id);
    const book = books.find(b => b.id === id);

    if (!book) return;

    /* ===== ADD TO CART ===== */
    if (e.target.classList.contains("add-to-cart")) {

        const existing = cart.find(item => item.id === book.id);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...book, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();

        showToast("Added to cart 🛒");
    }

    /* ===== VIEW PRODUCT ===== */
    if (e.target.classList.contains("view-btn")) {
        window.location.href = `product.html?id=${book.id}`;
    }
});

/* ================= SEARCH ================= */
function initSearch() {
    const searchInput = document.querySelector(".search-box input");

    if (!searchInput) return;

    searchInput.addEventListener("input", () => {
        const value = searchInput.value.toLowerCase();

        const filtered = books.filter(book =>
            book.title.toLowerCase().includes(value)
        );

        renderBooks(filtered);
    });
}

/* ================= TOAST (BETTER UX) ================= */
function showToast(message) {

    const toast = document.createElement("div");
    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.background = "#089da1";
    toast.style.color = "white";
    toast.style.padding = "10px 15px";
    toast.style.borderRadius = "6px";
    toast.style.zIndex = "999";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2000);
}