import { API } from "../config";
import { initialOrders } from "../core/mockData";

export const read = async (userId, token) => {
    if (API) {
        try {
            const response = await fetch(`${API}/user/${userId}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) return await response.json();
        } catch (err) {
            console.warn("Backend read user unavailable, using local:", err);
        }
    }
    try {
        const auth = JSON.parse(localStorage.getItem("jwt"));
        if (auth && auth.user) return auth.user;
    } catch (e) {}
    return { _id: userId, name: "Traveler", email: "user@example.com", role: 0 };
};

export const update = async (userId, token, user) => {
    if (API) {
        try {
            const response = await fetch(`${API}/user/${userId}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(user)
            });
            if (response.ok) return await response.json();
        } catch (err) {
            console.warn("Backend update user unavailable, using local:", err);
        }
    }
    return user;
};

export const updateUser = (user, next) => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("jwt")) {
            let auth = JSON.parse(localStorage.getItem("jwt"));
            auth.user = { ...auth.user, ...user };
            localStorage.setItem("jwt", JSON.stringify(auth));
            next();
        }
    }
};

export const getPurchaseHistory = async (userId, token) => {
    if (API) {
        try {
            const response = await fetch(`${API}/orders/by/user/${userId}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) return await response.json();
        } catch (err) {
            console.warn("Backend getPurchaseHistory unavailable, using local:", err);
        }
    }
    try {
        const stored = localStorage.getItem("travelyaari_orders");
        if (stored) return JSON.parse(stored);
    } catch (e) {}
    return initialOrders;
};
