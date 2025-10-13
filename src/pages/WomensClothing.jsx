import React from "react";
import { Gallery } from "../components/Gallery";


export const WomensClothing = ({handleAddToCart}) => {



    return(
        <div>
            <h1 className="ms-5 mt-3">Women´s clothing</h1>
            <Gallery addToCart={handleAddToCart} category="women's%20clothing"/>
        </div>
    )
}