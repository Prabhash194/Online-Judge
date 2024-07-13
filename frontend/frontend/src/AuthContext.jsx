import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const BASE_URL = "http://localhost:4000";
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const username = localStorage.getItem("username");
        const emailId = localStorage.getItem("email");
        return token ? { loggedIn: true, token, role, username, emailId } : null;
    });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/profile`, { withCredentials: true });
                const { token, role, username, emailId } = response.data;

                setAuth({ loggedIn: true, token, role, username, emailId});

                localStorage.setItem("token", token);
                localStorage.setItem("role", role);
                localStorage.setItem("username", username);
                localStorage.setItem("email", emailId);
            } catch (err) {
                console.error("Error fetching profile:", err);
                setAuth({ loggedIn: false, token: null, role: null, username: null, emailId:null});
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                localStorage.removeItem("username");
                localStorage.removeItem("email");
            }
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, { email, password }, { withCredentials: true });
            const { token, role } = response.data;

            setAuth({ loggedIn: true, token, role });

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            // Immediately fetch the profile after login
            const profileResponse = await axios.get(`${BASE_URL}/profile`, { withCredentials: true });
            const { username,emailId } = profileResponse.data;
            setAuth(prev => ({ ...prev, username,emailId }));
            localStorage.setItem("username", username);
            localStorage.setItem("email", emailId);
            
        } catch (err) {
            console.error("Error logging in:", err);
        }
    };

    const register = async (username, email, password) => {
        await axios.post(`${BASE_URL}/register`, { username, email, password});
    };

    const logout = async () => {
        await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
        setAuth(false);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
    };

    return <AuthContext.Provider value={{ auth, setAuth, login, register, logout }}>{children}</AuthContext.Provider>;
};
