import React from "react";
import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { CarritoContext } from "../context/CarritoContext";
import {ModalProducto} from "../components/ModalProducto";

export const Ofertas = () => {

    const {products} = useContext(ProductsContext);
    const {handleAddToCart} = useContext(CarritoContext);

    return(
        <div>
            <h1 className="ms-5 mt-3">Offers</h1>
            <Container className="my-5 mobile-margin">
                <Row className="g-4  ">
                    
                    {products.map((product)=>(
                        <Col   
                        key={product.id} 
                        xs={{ span: 10, offset: 1 }} 
                        sm={{ span: 6, offset: 0 }} 
                        md={4} 
                        lg={3}>
                            <Card className="shadow h-100 d-flex flex-column">
                                <Card.Img
                                    variant="top"
                                    src={product.image}
                                    alt={product.title}
                                    loading="lazy"
                                    width={300}
                                    height={320}
                                    
                                />
                                <Card.Body className="d-flex flex-column justify-content-between flex-grow-1">
                                    
                                    <Card.Title className="mb-2 fs-6 text">{product.title}</Card.Title>

                                    <Card.Text className="mt-3 d-flex align-items-center justify-content-between">
                                        <span className="fs-5 fw-bold">${product.price}</span>
                                        {product.stock === 0 && (
                                            <span className="text-danger fw-semibold">Out of Stock</span>
                                        )}
                                        
                                    </Card.Text>

                                    <ModalProducto producto={product}/>
                                    
                                    <Button
                                    variant="secondary"
                                    className={`w-100 mt-2 ${product.stock === 0 ? "disabled":""}`} 
                                    onClick={() => handleAddToCart(product)}
                                    >
                                    Add to cart
                                    </Button>
                                </Card.Body>
                            </Card>
                            
                        </Col>
                    ))}

                </Row>
            </Container>

            <Modal>
                
            </Modal>
        </div>
    );
}