import React, { useContext, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import "../styles/custom.css"
import { ItemCarrito } from "./ItemCarrito";
import { CarritoContext } from "../context/CarritoContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';

import Swal from "sweetalert2"



export const Carrito = ( ) => {
    // Contexto Carrito
    const {cart, handleCleanCart} = useContext(CarritoContext);

    const [show,setShow] = useState(false);
    //Precio total 
    const precioTotal = cart.reduce((acc, item) => acc + item.price *  (item.cantidad || 1), 0);
    const precioFormateado = precioTotal.toFixed(2).replace('.', ',');

    const handleShow = () => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false)
    }
    
    let cantidadTotal = cart.reduce((acc, item)=> acc + (item.cantidad || 1),0);
    

    const confirmDelate = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You can't reverse this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2aa430ff",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I want to clean the cart!"
            }).then((result) => {
                if (result.isConfirmed) {
                    handleCleanCart() 
                    Swal.fire({
                    title: "Cleaned!",
                    text: "Your cart was cleaned.",
                    icon: "success"
                });
            }   
            });            
        }

    return(
        <section>

            <Button type="button" className="btn btn-dark mx-2 position-relative" onClick={handleShow} aria-label="Open cart" title="Open cart">

                {cart.length>0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ">{cantidadTotal}</span>
                )}
                        
                    <FontAwesomeIcon icon={faCartShopping} style={{color: "#ffffff",}} />
                        
            </Button>


            <Offcanvas show={show} onHide={handleClose} placement="end" className="carritoAncho">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="text-dark-emphasis">Shopping Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <hr className="mx-4"/>
                <Offcanvas.Body>

                {cart.length === 0 && (
                        <p className="text-center text-muted p-3">
                            Your shopping cart is empty
                        </p>
                    )}  

                    <ul className="list-unstyled">
                        {cart.map((itemCart)=>(
                            <li key={itemCart.id}>
                                <ItemCarrito producto={itemCart} />
                            </li>
                            
                        ))}
                    </ul>

                    
                    
                    {cart.length > 0 && (

                    
                    <>

                        <div className="mt-3 fw-bold d-flex justify-content-between">
                            <span>Total:</span>
                            <span>${precioFormateado}</span>
                        </div>
                        <div className="d-flex flex-column align-items-center gap-3 mt-4">

                            <Button 
                                className="btn btn-danger w-50 fw-bold py-2" 
                                onClick={confirmDelate}
                            >
                                Clean
                            </Button>

                            <Button 
                                className="btn btn-success w-50 fw-bold py-2" 
                                onClick={handleCleanCart}
                            >
                                Buy
                            </Button>
                        </div>

                    </>
                    )}


                </Offcanvas.Body>
            </Offcanvas>
        
        </section>
    );
}