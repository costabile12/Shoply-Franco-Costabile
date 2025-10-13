import React from "react";
import { Gallery } from "../components/Gallery";

export const Jewelery = ({handleAddToCart}) => {

    return(
        <>
            <h1 className="ms-5 mt-3">Jewelery</h1>
            <Gallery category="jewelery"  addToCart={handleAddToCart}/>
        </>
    )
}