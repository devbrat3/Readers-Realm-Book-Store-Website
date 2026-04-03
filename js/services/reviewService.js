/* ================= REVIEW SERVICE ================= */

const ReviewService = (() => {

    const KEY = "reviews";

    function getData() {
        return JSON.parse(localStorage.getItem(KEY)) || {};
    }

    function saveData(data) {
        localStorage.setItem(KEY, JSON.stringify(data));
    }

    return {

        /* ===== GET REVIEWS ===== */
        getReviews(bookId) {
            const data = getData();
            return data[bookId] || [];
        },

        /* ===== ADD REVIEW ===== */
        addReview(bookId, review) {

            const data = getData();

            if (!data[bookId]) {
                data[bookId] = [];
            }

            data[bookId].push({
                ...review,
                date: new Date().toISOString()
            });

            saveData(data);

            document.dispatchEvent(new Event("reviewUpdated"));
        },

        /* ===== SORT ===== */
        getSorted(bookId, type = "latest") {

            const reviews = this.getReviews(bookId);

            if (type === "highest") {
                return [...reviews].sort((a, b) => b.rating - a.rating);
            }

            // latest
            return [...reviews].sort((a, b) =>
                new Date(b.date) - new Date(a.date)
            );
        }

    };

})();