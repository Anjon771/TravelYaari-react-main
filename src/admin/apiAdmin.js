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
        } catch (err) {}
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
        } catch (err) {}
    }
    const categories = getStoredCategories();
    const index = categories.findIndex(c => c._id === categoryId);
    if (index !== -1) {
        categories[index].name = category.name;
        saveStoredCategories(categories);
        return categories[index];
    }
    return { name: category.name };
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
        } catch (err) {}
    }
    const products = getStoredProducts();
    let name = "New Sanctuary Retreat";
    let description = "Scenic retreat";
    let price = 5000;
    let category = "cat_mountains";
    let quantity = 5;
    let shipping = true;
    let youtubelink = "";
    let subname = "Boutique Stay";

    if (product instanceof FormData) {
        name = product.get("name") || name;
        description = product.get("description") || description;
        price = Number(product.get("price")) || price;
        category = product.get("category") || category;
        quantity = Number(product.get("quantity")) || quantity;
        shipping = product.get("shipping") === "1" || product.get("shipping") === true;
        youtubelink = product.get("youtubelink") || youtubelink;
        subname = product.get("subname") || subname;
    }

    const categories = getStoredCategories();
    const catObj = categories.find(c => c._id === category) || { _id: category, name: "Boutique Escape" };

    const newProd = {
        _id: "prod_" + Date.now(),
        name,
        subname,
        description,
        price,
        category: catObj,
        quantity,
        sold: 0,
        shipping,
        youtubelink,
        createdAt: new Date().toISOString()
    };
    products.unshift(newProd);
    saveStoredProducts(products);
    return newProd;
};

export const getCategory = async categoryId => {
    if (API) {
        try {
            const response = await fetch(`${API}/category/${categoryId}`, { method: 'GET' });
            if (response.ok) return await response.json();
        } catch (err) {}
    }
    const categories = getStoredCategories();
    return categories.find(c => c._id === categoryId) || { _id: categoryId, name: "Category" };
};

export const getCategories = async () => {
    if (API) {
        try {
            const response = await fetch(`${API}/categories`, { method: 'GET' });
            if (response.ok) return await response.json();
        } catch (err) {}
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
        } catch (err) {}
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
        } catch (err) {}
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
        } catch (err) {}
    }
    const orders = getStoredOrders();
    const ord = orders.find(o => o._id === orderId);
    if (ord) {
        ord.status = status;
        saveStoredOrders(orders);
    }
    return { status, orderId };
};

export const getProducts = async () => {
    if (API) {
        try {
            const response = await fetch(`${API}/products?limit=undefined`, { method: 'GET' });
            if (response.ok) return await response.json();
        } catch (err) {}
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
        } catch (err) {}
    }
    let products = getStoredProducts();
    products = products.filter(p => p._id !== productId);
    saveStoredProducts(products);
    return { message: "Product deleted" };
};

export const getProduct = async productId => {
    if (API) {
        try {
            const response = await fetch(`${API}/product/${productId}`, { method: 'GET' });
            if (response.ok) return await response.json();
        } catch (err) {}
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
        } catch (err) {}
    }
    const products = getStoredProducts();
    const index = products.findIndex(p => p._id === productId);
    if (index !== -1) {
        if (product instanceof FormData) {
            products[index].name = product.get("name") || products[index].name;
            products[index].subname = product.get("subname") || products[index].subname;
            products[index].description = product.get("description") || products[index].description;
            products[index].price = Number(product.get("price")) || products[index].price;
            products[index].quantity = Number(product.get("quantity")) || products[index].quantity;
        }
        saveStoredProducts(products);
        return products[index];
    }
    return { message: "Product updated" };
};
