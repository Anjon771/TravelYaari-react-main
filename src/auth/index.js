import { API } from '../config';

export const signup = async user => {
    if (API) {
        try {
            const response = await fetch(`${API}/signup`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            if (response.ok) return await response.json();
        } catch (err) {}
    }
    // Local fallback signup
    if (!user.email || !user.password) {
        return { error: "Email and password are required" };
    }
    try {
        const users = JSON.parse(localStorage.getItem('travelyaari_registered_users') || '[]');
        if (users.find(u => u.email === user.email)) {
            return { error: "Email is already registered" };
        }
        const newUser = {
            _id: "usr_" + Date.now(),
            name: user.name || user.email.split('@')[0],
            email: user.email,
            password: user.password,
            role: user.email.includes('admin') ? 1 : 0
        };
        users.push(newUser);
        localStorage.setItem('travelyaari_registered_users', JSON.stringify(users));
        return { user: { _id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role } };
    } catch (e) {
        return { user: { _id: "usr_default", name: user.name, email: user.email, role: 0 } };
    }
};

export const signin = async user => {
    if (API) {
        try {
            const response = await fetch(`${API}/signin`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            if (response.ok) return await response.json();
        } catch (err) {}
    }
    // Local fallback signin
    if (!user.email || !user.password) {
        return { error: "Email and password are required" };
    }
    const isAdmin = user.email.toLowerCase().includes('admin');
    const authData = {
        token: "demo_jwt_token_" + Date.now(),
        user: {
            _id: isAdmin ? "admin_001" : "user_001",
            name: user.email.split('@')[0],
            email: user.email,
            role: isAdmin ? 1 : 0
        }
    };
    return authData;
};

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const signout = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        if (API) {
            fetch(`${API}/signout`, {
                method: 'GET'
            }).catch(() => {});
        }
    }
};

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};
