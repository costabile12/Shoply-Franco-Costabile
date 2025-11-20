import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';

export const CarritoContext = createContext();

export const CarritoProvider = ({children}) => {

    const [cart, setCart] = useState(()=>{
        const savedCart = localStorage.getItem("carrito");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    //Funcion para agregar un producto al carrito
    const handleAddToCart = (product) => {

        const exist = cart.find((item)=> item.id === product.id);

        if(exist){
        //Si ya está, aumento la cantidad
        setCart(
            cart.map(item => item.id === product.id ?
                {...item, cantidad: item.cantidad+1}: item )
        );
        } else {
        // Si no está en el carrito, lo agego con cantidad 1
            setCart(
                [...cart, {...product, cantidad:1}]
                
            );
            toast.success(`"${product.title}" has been added to your cart`);
        }

        
        

    };

    // Funcion para borrar todo el contenido del carrito
    const handleCleanCart = () => {
        setCart([]);
        
    }
    // Funcion para borrar un producto por id del carrito
    const handleDeleteProductCart = (product) => {
        let newCart = cart.filter((item) => item.id != product.id);
        setCart(newCart);
        Swal.fire({
            title: 'Product removed!',
            text: `"${product.title}" has been removed from your cart`,
            icon: 'warning',
            confirmButtonText: 'Got it'
        });
    };
    // Funcion para incrementar la cantidad de un producto por id en el carrito
    const handleIncreanseQuantity = (id) => {
        setCart(
        cart.map( item => item.id===id ? {...item, cantidad: item.cantidad +1}: item)
        )
    }

    // Funcion para decrementar la cantidad de un producto por id en el carrito
    const handleDecreanseQuantity = (id) => {

        const product=cart.find(item => item.id === id);
        if(product.cantidad - 1 === 0) {
            Swal.fire({
                title: 'Product removed!',
                text: `"${product.title}" has been removed from your cart`,
                icon: 'warning',
                confirmButtonText: 'Got it'
            });
        }

        setCart(
        cart.map(item => 
            item.id === id ? {...item, cantidad: item.cantidad-1}:item)
        .filter(item => item.cantidad > 0)
        )
    }

    useEffect(()=> {
        localStorage.setItem("carrito",JSON.stringify(cart));
    },[cart]);

    return(
        <CarritoContext.Provider value={{cart, handleAddToCart, handleCleanCart, handleDeleteProductCart, handleIncreanseQuantity, handleDecreanseQuantity}}>
            {children}
            <ToastContainer position="top-right" autoClose={1500} />
        </CarritoContext.Provider>
    )


}

;