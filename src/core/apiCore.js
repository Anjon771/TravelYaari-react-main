import { API } from "../config";
import queryString from "query-string";
import { initialProducts, initialCategories } from "./mockData";

export const getLocalProducts = () => {
    try {
        const stored = localStorage.getItem("travelyaari_products");
        if (stored) return JSON.parse(stored);
    } catch (e) {}
    return initialProducts;
};

export const setLocalProducts = (products) => {
    try {
        localStorage.setItem("travelyaari_products", JSON.stringify(products));
    } catch (e) {}
};

export const getLocalCategories = () => {
    try {
        const stored = localStorage.getItem("travelyaari_categories");
        if (stored) return JSON.parse(stored);
    } catch (e) {}
    return initialCategories;
};

export const setLocalCategories = (categories) => {
    try {
        localStorage.setItem("travelyaari_categories", JSON.stringify(categories));
    } catch (e) {}
};

export const getProducts = async sortBy => {
    if (API) {
        try {
            const response = await fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=4`, {
                method: "GET"
            });
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) return data;
            }
        } catch (err) {
            console.warn("Backend unavailable, using fallback places:", err);
        }
    }
    const all = getLocalProducts();
    if (sortBy === 'sold') {
        return [...all].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 4);
    }
    return [...all].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
};

export const getCategories = async () => {
    if (API) {
        try {
            const response = await fetch(`${API}/categories`, { method: "GET" });
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) return data;
            }
        } catch (err) {
            console.warn("Backend unavailable, using fallback categories:", err);
        }
    }
    return getLocalCategories();
};

export const getFilteredProducts = async (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    };
    if (API) {
        try {
            const response = await fetch(`${API}/products/by/search`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const resData = await response.json();
                if (resData && typeof resData === "object" && resData.data) return resData;
            }
        } catch (err) {
            console.warn("Backend unavailable, using fallback filter:", err);
        }
    }
    let all = getLocalProducts();
    if (filters.category && filters.category.length > 0) {
        all = all.filter(p => p.category && filters.category.includes(p.category._id));
    }
    if (filters.price && filters.price.length === 2) {
        const [min, max] = filters.price;
        all = all.filter(p => p.price >= min && p.price <= max);
    }
    const sliced = all.slice(skip, skip + limit);
    return {
        size: all.length,
        data: sliced
    };
};

export const list = async params => {
    const query = queryString.stringify(params);
    if (API) {
        try {
            const response = await fetch(`${API}/products/search?${query}`, { method: "GET" });
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) return data;
            }
        } catch (err) {
            console.warn("Backend unavailable, using fallback search:", err);
        }
    }
    let all = getLocalProducts();
    const search = params && params.search ? params.search.toLowerCase() : "";
    const category = params && params.category;
    if (category && category !== "All") {
        all = all.filter(p => p.category && (p.category._id === category || p.category.name === category));
    }
    if (search) {
        all = all.filter(p => 
            (p.name && p.name.toLowerCase().includes(search)) ||
            (p.subname && p.subname.toLowerCase().includes(search)) ||
            (p.description && p.description.toLowerCase().includes(search))
        );
    }
    return all;
};

export const read = async productId => {
    if (API) {
        try {
            const response = await fetch(`${API}/product/${productId}`, { method: "GET" });
            if (response.ok) {
                const data = await response.json();
                if (data && !data.error) return data;
            }
        } catch (err) {
            console.warn("Backend unavailable, using fallback product:", err);
        }
    }
    const all = getLocalProducts();
    const found = all.find(p => p._id === productId);
    return found || all[0];
};

export const listRelated = async productId => {
    if (API) {
        try {
            const response = await fetch(`${API}/products/related/${productId}`, { method: "GET" });
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) return data;
            }
        } catch (err) {
            console.warn("Backend unavailable, using fallback related:", err);
        }
    }
    const all = getLocalProducts();
    return all.filter(p => p._id !== productId).slice(0, 3);
};

export const getBraintreeClientToken = async (userId, token) => {
    if (API) {
        try {
            const response = await fetch(`${API}/braintree/getToken/${userId}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) return await response.json();
        } catch (err) {
            console.log(err);
        }
    }
    return { error: "Braintree payment gateway not configured. Please use Demo Booking." };
};

export const processPayment = async (userId, token, paymentData) => {
    if (API) {
        try {
            const response = await fetch(`${API}/braintree/payment/${userId}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(paymentData)
            });
            if (response.ok) return await response.json();
        } catch (err) {
            console.log(err);
        }
    }
    return { success: true, transaction: { id: "txn_" + Date.now(), amount: paymentData.amount } };
};

export const createOrder = async (userId, token, createOrderData) => {
    if (API) {
        try {
            const response = await fetch(`${API}/order/create/${userId}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ order: createOrderData })
            });
            if (response.ok) return await response.json();
        } catch (err) {
            console.log(err);
        }
    }
    const newOrder = {
        _id: "ord_" + Date.now(),
        ...createOrderData,
        status: "Processing",
        createdAt: new Date().toISOString()
    };
    try {
        const stored = JSON.parse(localStorage.getItem("travelyaari_orders") || "[]");
        stored.push(newOrder);
        localStorage.setItem("travelyaari_orders", JSON.stringify(stored));
    } catch (e) {}
    return { success: true, order: newOrder };
};
