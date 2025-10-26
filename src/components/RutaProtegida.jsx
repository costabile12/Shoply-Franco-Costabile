import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const RutaProtegida =({children}) => {
    const {token} = useAuthContext();
    return token ? children:<Navigate to="/login" replace />
}