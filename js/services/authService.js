const AuthService = {

    register(user) {
        let users = JSON.parse(localStorage.getItem("users")) || [];

        const exists = users.find(u => u.email === user.email);
        if (exists) return { success: false, message: "User already exists" };

        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        return { success: true };
    },

    login(email, password) {
        let users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return { success: false, message: "Invalid credentials" };
        }

        localStorage.setItem("currentUser", JSON.stringify(user));
        return { success: true };
    },

    logout() {
        localStorage.removeItem("currentUser");
    },

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("currentUser"));
    }

};

window.AuthService = AuthService;