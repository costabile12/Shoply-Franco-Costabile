import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    
    const [token, setToken] = useState(()=>{
        return localStorage.getItem('authToken') || null;
    }); 

    const login = (username) => {
        const token = `fake-token-${username}`;
        localStorage.setItem('authToken', token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
    };
    
    return(
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);