import { API } from '../config';
import { initialProducts, initialCategories, initialOrders } from '../core/mockData';

const getStoredProducts = () => {
    try {
        const stored = localStorage.getItem("travelyaari_products");
        if (stored) return JSON.parse(stored);
    } catch (e) {}
    return initialProducts;
};

const saveStoredProducts = (products) => {
    try {
        localStorage.setItem("travelyaari_products", JSON.stringify(products));
    } catch (e) {}
};

const getStoredCategories = () => {
    try {
        const stored = localStorage.getItem("travelyaari_categories");
        if (stored) return JSON.parse(stored);
    } catch (e) {}
    return initialCategories;
};

const saveStoredCategories = (categories) => {
    try {
        localStorage.setItem("travelyaari_categories", JSON.stringify(categories));
    } catch (e) {}
};

const getStoredOrders = () => {
    try {
        const stored = localStorage.getItem("travelyaari_orders");
        if (stored) return JSON.parse(stored);
    } catch (e) {}
    return initialOrders;
};

const saveStoredOrders = (orders) => {
    try {
        localStorage.setItem("travelyaari_orders", JSON.stringify(orders));
    } catch (e) {}
};

export const createCategory = async (userId, token, category) => {
    if (API) {
        try {
            const response = await fetch(`${API}/category/create/${userId}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(category)
            });
            if (response.ok) return await response.json();
        } catch (err) {
            console.warn("Backend createCategory unavailable, using local:", err);
        }
    }
    const categories = getStoredCategories();
    const newCategory = {
        _id: "cat_" + Date.now(),
        name: category.name
    };
    categories.push(newCategory);
    saveStoredCategories(categories);
    return newCategory;
};

export const updateCategory = async (categoryId, userId, token, category) => {
    if (API) {
        try {
            const response = await fetch(`${API}/category/${categoryId}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(category)
            });
            if (response.ok) return await response.json();
        } catch (err) {
            console.warn("Backend updateCategory unavailable, using local:", err);
        }
    }
    const categories = getStoredCategories();
    const updated = categories.map(c => c._id === categoryId ? { ...c, ...category } : c);
    saveStoredCategories(updated);
    return { success: true };
};

export const createProduct = async (userId, token, product) => {
    if (API) {
        try {
            const response = await fetch(`${API}/product/create/${userId}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: product
            });
            if (response.ok) return await response.json();
        } catch (err) {
            console.warn("Backend createProduct unavailable, using local:", err);
        }
    }
    const products = getStoredProducts();
    // product might be FormData or plain object
    let name = "New Place";
    let description = "Scenic destination";
    let price = 3000;
    let category = "cat_hill";
    let quantity = 10;
    if (product instanceof FormData) {
        name = product.get("name") || name;
        description = product.get("description") || description;
        price = Number(product.get("price")) || price;
        category = product.get("category") || category;
        quantity = Number(product.get("quantity")) || quantity;
    } else if (product && typeof product === "object") {
        name = product.name || name;
        description = product.description || description;
        price = product.price || price;
        category = product.category || category;
        quantity = product.quantity || quantity;
    }
    const categories = getStoredCategories();
    const catObj = categories.find(c => c._id === category) || { _id: category, name: "General" };
    const newProduct = {
        _id: "prod_" + Date.now(),
        name,
        subname: "India",
        description,
        price,
        category: catObj,
        quantity,
        sold: 0,
        createdAt: new Date().toISOString(),
        youtubelink: "Wf5lYJ8dYpk"
    };
    products.push(newProduct);
    saveStoredProducts(products);
    return newProduct;
};

export const getCategory = async categoryId => {
    if (API) {
        try {
            const response = await fetch(`${API}/category/${categoryId}`, { method: 'GET' });
            if (response.ok) return await response.json();
        } catch (err) {
            console.warn("Backend getCategory unavailable, using local:", err);
        }
    }
    const categories = getStoredCategories();
    return categories.find(c => c._id === categoryId) || categories[0];
};

export const getCategories = async () => {
    if (API) {
        try {
            const response = await fetch(`${API}/categories`, { method: 'GET' });
            if (response.ok) return await response.json();
        } catch (err) {
            console.warn("Backend getCategories unavailable, using local:", err);
        }
    }
    return getStoredCategories();
};

export const listOrders = async (userId, token) => {
    if (API) {
        try {
            const response = await fetch(`${API}/order/list/${userId}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) return await response.json();
        } catch (err) {
            console.warn("Backend listOrders unavailable, using local:", err);
        }
    }
    return getStoredOrders();
};

export const getStatusValues = async (userId, token) => {
    if (API) {
        try {
            const response = await fetch(`${API}/order/status-values/${userId}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) return await response.json();
        } catch (err) {
            console.warn("Backend getStatusValues unavailable, using local:", err);
        }
    }
    return ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"];
};

export const updateOrderStatus = async (userId, token, orderId, status) => {
    if (API) {
        try {
            const response = await fetch(`${API}/order/${orderId}/status/${userId}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status, orderId })
            });
            if (response.ok) return await response.json();
        } catch (err) {
            console.warn("Backend updateOrderStatus unavailable, using local:", err);
        }
    }
    const orders = getStoredOrders();
    const updated = orders.map(o => o._id === orderId ? { ...o, status } : o);
    saveStoredOrders(updated);
    return { success: true };
};

export const getProducts = async () => {
    if (API) {
        try {
            const response = await fetch(`${API}/products?limit=undefined`, { method: 'GET' });
            if (response.ok) return await response.json();
        } catch (err) {
            console.warn("Backend getProducts unavailable, using local:", err);
        }
    }
    return getStoredProducts();
};

export const deleteProduct = async (productId, userId, token) => {
    if (API) {
        try {
            const response = await fetch(`${API}/product/${productId}/${userId}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) return await response.json();
        } catch (err) {
            console.warn("Backend deleteProduct unavailable, using local:", err);
        }
    }
    const products = getStoredProducts();
    const updated = products.filter(p => p._id !== productId);
    saveStoredProducts(updated);
    return { message: "Product deleted successfully" };
};

export const getProduct = async productId => {
    if (API) {
        try {
            const response = await fetch(`${API}/product/${productId}`, { method: 'GET' });
            if (response.ok) return await response.json();
        } catch (err) {
            console.warn("Backend getProduct unavailable, using local:", err);
        }
    }
    const products = getStoredProducts();
    return products.find(p => p._id === productId) || products[0];
};

export const updateProduct = async (productId, userId, token, product) => {
    if (API) {
        try {
            const response = await fetch(`${API}/product/${productId}/${userId}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: product
            });
            if (response.ok) return await response.json();
        } catch (err) {
            console.warn("Backend updateProduct unavailable, using local:", err);
        }
    }
    const products = getStoredProducts();
    const updated = products.map(p => p._id === productId ? { ...p, ...product } : p);
    saveStoredProducts(updated);
    return { success: true };
};
