import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const usersList = [
    { username: "admin", password: "1234", role: "admin" },
    { username: "lucia",  password: "1234", role: "user" },
    { username: "carlos", password: "1234", role: "user" },
];

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(() => {
        return localStorage.getItem('authToken') || null;
    });

    const [role, setRole] = useState(() => {
        return localStorage.getItem('authRole') || null;
    });

    
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("authUser");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (username, password) => {

        const userFound = usersList.find(
            u => u.username === username && u.password === password
        );

        if (!userFound) {
            return { success: false, message: "Incorrect username or password" };
        }

        const newToken = `fake-token-${userFound.username}`;

        // Guardar token, rol y usuario
        localStorage.setItem("authToken", newToken);
        localStorage.setItem("authRole", userFound.role);
        localStorage.setItem("authUser", JSON.stringify(userFound));

        setToken(newToken);
        setRole(userFound.role);
        setUser(userFound);   // ❗ SE GUARDA EL USUARIO

        return { success: true, user: userFound };
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authRole");
        localStorage.removeItem("authUser");

        setToken(null);
        setRole(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, role, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
