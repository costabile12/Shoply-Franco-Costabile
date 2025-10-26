import { createContext, useState, useEffect } from "react";

export const CarritoContext=createContext();

export const CarritoProvider = ({children}) => {

    const [cart, setCart] = useState(()=>{
        const savedCart = localStorage.getItem("carrito");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const handleAddToCart = (product) => {

        const exist = cart.find((item)=> item.id === product.id);

        if(exist){
        //Si ya está, aumentamos la cantidad
        setCart(
            cart.map(item => item.id === product.id ?
                {...item, cantidad: item.cantidad+1}: item )
        );
        }else {
        // Si no está en el carrito, lo agego con cantidad 1
        setCart(
            [...cart, {...product, cantidad:1}]
            
        );
        alert(`Se agrego ${product.title} al carrito`);
        }

        
        

    };

    const handleCleanCart = () => {
        setCart([]);
        
    }

    const handleDeleteProductCart = (product) => {
        let newCart = cart.filter((item) => item.id != product.id);
        setCart(newCart);
        alert(`Se elimino ${product.title} del carrito`)
    };

    const handleIncreanseQuantity = (id) => {
        setCart(
        cart.map( item => item.id===id ? {...item, cantidad: item.cantidad +1}: item)
        )
    }

    const handleDecreanseQuantity = (id) => {
        setCart(
        cart.map(item => item.id === id ? {...item, cantidad: item.cantidad-1}:item).filter(item => item.cantidad > 0)
        )
    }

    useEffect(()=> {
        localStorage.setItem("carrito",JSON.stringify(cart));
    },[cart]);

    return(
        <CarritoContext.Provider value={{cart, handleAddToCart, handleCleanCart, handleDeleteProductCart, handleIncreanseQuantity, handleDecreanseQuantity}}>
            {children}
        </CarritoContext.Provider>
    )


}

