import React from "react"
import { Gallery } from "../components/Gallery"

export const MensClothing = ( {handleAddToCart} ) => {

    return(
        <div>
            <h1 className="ms-5 mt-3">Men's clothing</h1>
            <Gallery category="men's%20clothing" addToCart={handleAddToCart} />
        </div> 

    )
}