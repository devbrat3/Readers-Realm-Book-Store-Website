/* ================= AUTH SERVICE ================= */

const AuthService = (() => {

    const USERS_KEY = "users";
    const CURRENT_KEY = "currentUser";

    /* ================= PRIVATE ================= */

    function getUsers() {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    }

    function saveUsers(users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    function setCurrentUser(user) {
        localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
        document.dispatchEvent(new Event("authChanged"));
    }

    function clearCurrentUser() {
        localStorage.removeItem(CURRENT_KEY);
        document.dispatchEvent(new Event("authChanged"));
    }

    /* ================= PUBLIC ================= */

    return {

        /* ===== REGISTER ===== */
        register(user) {

            const users = getUsers();

            const exists = users.find(u => u.email === user.email);

            if (exists) {
                return { success: false, message: "User already exists" };
            }

            if (!user.name || !user.email || !user.password) {
                return { success: false, message: "All fields required" };
            }

            // 🔐 Simple hash (frontend only)
            const hashedPassword = btoa(user.password);

            const newUser = {
                id: Date.now(),
                name: user.name,
                email: user.email,
                password: hashedPassword
            };

            users.push(newUser);
            saveUsers(users);

            return { success: true };
        },

        /* ===== LOGIN ===== */
        login(email, password) {

            const users = getUsers();

            const hashedPassword = btoa(password);

            const user = users.find(
                u => u.email === email && u.password === hashedPassword
            );

            if (!user) {
                return { success: false, message: "Invalid credentials" };
            }

            setCurrentUser({
                id: user.id,
                name: user.name,
                email: user.email
            });

            return { success: true };
        },

        /* ===== LOGOUT ===== */
        logout() {
            clearCurrentUser();
        },

        /* ===== CURRENT USER ===== */
        getCurrentUser() {
            return JSON.parse(localStorage.getItem(CURRENT_KEY));
        },

        /* ===== CHECK AUTH ===== */
        isAuthenticated() {
            return !!this.getCurrentUser();
        }

    };

})();

/* ===== GLOBAL ACCESS ===== */
window.AuthService = AuthService;