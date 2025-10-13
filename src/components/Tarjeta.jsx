import React from "react";
import { Button, Card } from "react-bootstrap";
import { ModalProduct } from "./ModalProducto";

export const Tarjeta = ({ producto, addToCart }) => {
  return (
    <Card className="shadow h-100 d-flex flex-column">
      <Card.Img
        variant="top"
        src={producto.image}
        alt={producto.title}
        loading="lazy"
        width={300}
        height={320}
      />
      <Card.Body className="d-flex flex-column justify-content-between flex-grow-1">
        
        <Card.Title className="mb-2 fs-6 text">{producto.title}</Card.Title>
        <Card.Text className="fs-5 fw-bold mt-3 ">${producto.price}</Card.Text>

        <ModalProduct producto={producto} />
        <Button
          variant="secondary"
          className="w-100 mt-2"
          onClick={() => addToCart(producto)}
        >
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
};