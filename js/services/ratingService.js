const RatingService = (() => {

    const KEY = "ratings";

    function getData() {
        return JSON.parse(localStorage.getItem(KEY)) || {};
    }

    function saveData(data) {
        localStorage.setItem(KEY, JSON.stringify(data));
    }

    return {

        getRating(bookId) {
            const data = getData();
            return data[bookId] || null;
        },

        setRating(bookId, value) {
            const data = getData();

            if (!data[bookId]) {
                data[bookId] = { total: 0, count: 0 };
            }

            data[bookId].total += value;
            data[bookId].count += 1;

            saveData(data);

            document.dispatchEvent(new Event("ratingUpdated"));
        },

        getAverage(book) {

            const data = getData();
            const local = data[book.id];

            if (!local) return book.rating;

            const total = (book.rating * book.ratingCount) + local.total;
            const count = book.ratingCount + local.count;

            return (total / count).toFixed(1);
        }

    };

})();