import React from "react";
import { Gallery } from "../components/Gallery";

export const Electronics = ({handleAddToCart}) => {

    return(
        <div>
            <h1 className="ms-5 mt-3">Electronics</h1>
            <Gallery category="electronics" addToCart={handleAddToCart}/>
        </div>
    );
}