import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import { useAuthContext } from "./AuthContext";

export const CarritoContext = createContext();

export const CarritoProvider = ({children}) => {

    const { token, user } = useAuthContext(); // Usuario logueado

    const [cart, setCart] = useState(() => {
        if (!user) return [];
        const savedCart = localStorage.getItem(`carrito-${user.username}`);
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // cargar carrito cuando cambia el usuario
    useEffect(() => {
        if (!user) {
            setCart([]);
            return;
        }
        const saved = localStorage.getItem(`carrito-${user.username}`);
        setCart(saved ? JSON.parse(saved) : []);
    }, [user]);

    // guardar carrito por usuario
    useEffect(() => {
        if (!user) return;
        localStorage.setItem(`carrito-${user.username}`, JSON.stringify(cart));
    }, [cart, user]);

    // bloquear si no está logueado
    const requiredLogin = () => {
        if (!user || !token) {
            Swal.fire({
                icon: "warning",
                title: "Login required",
                text: "You must log in to use the cart",
            });
            return false;
        }
        return true;
    };

    const handleAddToCart = (product) => {

        if (!requiredLogin()) return;

        const exist = cart.find(item => item.id === product.id);

        if (exist) {
            setCart(
                cart.map(item =>
                    item.id === product.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...product, cantidad: 1 }]);
            toast.success(`"${product.title}" added to your cart`);
        }
    };

    const handleCleanCart = () => setCart([]);

    const handleDeleteProductCart = (product) => {
        let newCart = cart.filter(item => item.id !== product.id);
        setCart(newCart);

        Swal.fire({
            title: 'Product removed!',
            text: `"${product.title}" has been removed from your cart`,
            icon: 'warning',
        });
    };

    const handleIncreanseQuantity = (id) => {
        setCart(
            cart.map(item =>
                item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
            )
        );
    };

    const handleDecreanseQuantity = (id) => {
        const product = cart.find(item => item.id === id);

        if (product.cantidad - 1 === 0) {
            Swal.fire({
                title: 'Product removed!',
                text: `"${product.title}" has been removed from your cart`,
                icon: 'warning',
            });
        }

        setCart(
            cart
                .map(item =>
                    item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
                )
                .filter(item => item.cantidad > 0)
        );
    };

    return (
        <CarritoContext.Provider 
            value={{ cart, handleAddToCart, handleCleanCart, handleDeleteProductCart, handleIncreanseQuantity, handleDecreanseQuantity }}
        >
            {children}
            <ToastContainer position="top-right" autoClose={1500} />
        </CarritoContext.Provider>
    );
};
