const BookService = {

    getAllBooks() {
        return window.books || [];
    },

    getBookById(id) {
        return this.getAllBooks().find(b => b.id === id);
    }

};

window.BookService = BookService;