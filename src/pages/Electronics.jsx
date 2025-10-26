import React from "react";
import { Gallery } from "../components/Gallery";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

export const Electronics = () => {

    const {handleAddToCart} = useContext(CarritoContext);

    return(
        <div>
            <h1 className="ms-5 mt-3">Electronics</h1>
            <Gallery category="electronics" addToCart={handleAddToCart}/>
        </div>
    );
}