import React from "react"


import "../styles/custom.css"
import { Button } from "react-bootstrap";


export const ItemCarrito = ({ producto, handleDeleteProductCart, handleIncreanseQuantity, handleDecreanseQuantity}) => {





    return(
        <section className="d-flex justify-content-between align-items-center mb-3 p-2 border rounded-3">

            <div className="d-flex align-items-center gap-3">
                <img src={producto.image} alt={producto.title} width={60} height={60} className="rounded-4" />
                <div className="d-flex flex-column">
                <span className="fw-semibold">{producto.title}</span>
                <span className="text-muted">${producto.price}</span>
                </div>
            </div>

            <div className="d-flex align-items-center gap-2">
                <button className="btn btn-secondary" onClick={() => handleDecreanseQuantity(producto.id)}>-</button>
                <span>{producto.cantidad}</span>
                <button className="btn btn-secondary" onClick={() => handleIncreanseQuantity(producto.id)}>+</button>

                <button className="btn btn-danger ms-2" onClick={() => handleDeleteProductCart(producto)}>
                X
                </button>
            </div>
        </section>
    )
}