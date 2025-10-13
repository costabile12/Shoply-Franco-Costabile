import React from "react";
import { Navegation } from "./Navegation";


export const Header = ({carrito, handleClean, handleDeleteProductCart, handleIncreanseQuantity, handleDecreanseQuantity}) => {
    return(
        <header className="bg-light bg-gradient px-2 py-3 text-dark border-bottom shadow-sm position-fixed z-3 w-100">
            <Navegation carrito={carrito} handleClean={handleClean} handleDeleteProductCart={handleDeleteProductCart} handleIncreanseQuantity={handleIncreanseQuantity} handleDecreanseQuantity={handleDecreanseQuantity}/>
        </header>
    );
};