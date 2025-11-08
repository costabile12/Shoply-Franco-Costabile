import React, { useContext, useState } from "react";
import { Button, InputGroup, Offcanvas, Form, Row, Col, Modal  } from "react-bootstrap";
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
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [formData, setFormData] = useState({
            fullName: "",
            email: "",
            telefono: "",
            direccion: "",
            metodoPago: "",
            cardType: "",
            numeroTarjeta: "",
            nombreTarjeta: "",
            vencimiento: "",
            cvv: ""
    });
    const [errors, setErrors] = useState({});


    //Precio total 
    const precioTotal = cart.reduce((acc, item) => acc + item.price *  (item.cantidad || 1), 0);
    const precioFormateado = precioTotal.toFixed(2).replace('.', ',');

    // Mostrar Carrito
    const handleShow = () => {
        setShow(true);
    };

    // Cerrar Carrito
    const handleClose = () => {
        setShow(false)
    }
    
    let cantidadTotal = cart.reduce((acc, item)=> acc + (item.cantidad || 1),0);
    
    // Borrar todo el contenido del carrito 
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

    // Abrir modal de compra 
    const handleShowBuyModal = () => {
        setShowBuyModal(true);
    };

    // Cerrar modal de compra 
    const handleCloseBuyModal = () => {
        setShowBuyModal(false);
    };

    // Validacion de formulario de compra
    const validarFormBuy = () => {
        let newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = "Required field";
        if (!formData.email.trim()) newErrors.email = "Required field";
        if (!formData.telefono.trim()) {
            newErrors.telefono = "Required field";
        } else if (/[a-zA-Z]/.test(formData.telefono)) {
            newErrors.telefono = "Phone can not contain letters";
        }
        if (!formData.direccion.trim()) newErrors.direccion = "Required field";
        if (!formData.metodoPago.trim()) newErrors.metodoPago = "Select a payment method";

        // Si eligió tarjeta, validar datos de tarjeta
        if (formData.metodoPago === "tarjeta") {
            if (!formData.cardType.trim()) newErrors.cardType = "Select card type";
            if (!formData.numeroTarjeta.trim()) {
                newErrors.numeroTarjeta = "Required";
            } else if (/[a-zA-Z]/.test(formData.numeroTarjeta)) {
                newErrors.numeroTarjeta = "Card number can not contain letters"
            }
            if (!formData.nombreTarjeta.trim()) newErrors.nombreTarjeta = "Required";
            if (!formData.vencimiento.trim()) newErrors.vencimiento = "Required";
            if (!formData.cvv.trim()) newErrors.cvv = "Required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    // Manejar envio
    const handleSubmit = () => {
        if(!validarFormBuy()) return;
        Swal.fire("Success!", "Your purchase has been confirmed.", "success");
        setFormData({
            fullName: "",
            email: "",
            telefono: "",
            direccion: "",
            metodoPago: "",
            cardType: "",
            numeroTarjeta: "",
            nombreTarjeta: "",
            vencimiento: "",
            cvv: ""
        });
        handleCleanCart();
        handleCloseBuyModal();
    }
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

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

                    
                    <div>

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
                                onClick={handleShowBuyModal}
                            >
                                Buy
                            </Button>
                        </div>

                    </div>
                    )}


                </Offcanvas.Body>
        </Offcanvas>


        <Modal show={showBuyModal} onHide={handleCloseBuyModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Purchase form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type='text'
                            name="fullName"
                            placeholder='John Doe'
                            value={formData.fullName}
                            onChange={handleChange}
                            required 
                            isInvalid={!!errors.fullName}/>
                        <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                        type='email'
                        name="email"
                        placeholder='email@example.com'
                        pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email} />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>                    
                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>+54</InputGroup.Text>
                            <Form.Control 
                            type="text"
                            name="telefono" 
                            placeholder="11 5555-5555" 
                            required
                            value={formData.telefono}
                            onChange={handleChange}
                            isInvalid={!!errors.telefono} />
                            <Form.Control.Feedback type="invalid">{errors.telefono}</Form.Control.Feedback>
                        </InputGroup>

                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control 
                        type="text" 
                        name="direccion"
                        placeholder="Av. Siempre Viva 742" 
                        required
                        value={formData.direccion}
                        onChange={handleChange}
                        isInvalid={!!errors.direccion} />
                        <Form.Control.Feedback type="invalid">{errors.direccion}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Payment Method</Form.Label>
                        <Form.Select 
                            name="metodoPago"
                            value={formData.metodoPago}
                            onChange={handleChange}
                            isInvalid={!!errors.metodoPago}
                            
                        >
                            <option value="">Select...</option>
                            <option value="mercadopago">Mercado Pago</option>
                            <option value="tarjeta">Credit Card</option>
                            <option value="transferencia">Bank Transfer</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.metodoPago}</Form.Control.Feedback>
                </Form.Group>

                {/* Campos solo si eligió tarjeta */}
                {formData.metodoPago === "tarjeta" && (
                    <>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label for="cardType">Card Type:</Form.Label>
                                    <Form.Select     
                                    name="cardType"
                                    value={formData.cardType}
                                    onChange={handleChange}
                                    isInvalid={!!errors.cardType}
                                    required >
                                        <option value="">Select...</option>
                                        <option value="visa">Visa</option>
                                        <option value="mastercard">Mastercard</option>
                                        <option value="amex">American Express</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">{errors.cardType}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Card Number</Form.Label>
                                    <Form.Control 
                                        name="numeroTarjeta"
                                        value={formData.numeroTarjeta}
                                        onChange={handleChange}
                                        isInvalid={!!errors.numeroTarjeta}
                                        placeholder="xxxx xxxx xxxx xxxx" 
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.numeroTarjeta}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>


                        
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Name on Card</Form.Label>
                                <Form.Control 
                                    name="nombreTarjeta"
                                    value={formData.nombreTarjeta}
                                    onChange={handleChange}
                                    isInvalid={!!errors.nombreTarjeta}
                                    placeholder="John Doe" 
                                />
                                <Form.Control.Feedback type="invalid">{errors.nombreTarjeta}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>


                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Expiration</Form.Label>
                                    <Form.Control 
                                        name="vencimiento"
                                        value={formData.vencimiento}
                                        onChange={handleChange}
                                        isInvalid={!!errors.vencimiento}
                                        placeholder="MM/YY" 
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.vencimiento}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control 
                                        name="cvv"
                                        value={formData.cvv}
                                        onChange={handleChange}
                                        isInvalid={!!errors.cvv}
                                        placeholder="123" 
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.cvv}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                        </Row>
                    </>
                )}
                    <Button variant="success" className="w-100 fw-bold py-2" onClick={handleSubmit}>
                            Confirm Purchase
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>

        </section>
    );
}