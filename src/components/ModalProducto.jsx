import {Modal, Button, Container, Row,  Col} from "react-bootstrap";
import { useState } from "react";

export const ModalProducto = ({producto}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                + Info
            </Button>

            <Modal show={show} onHide={handleClose}  size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">{producto.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Container>
                    <Row>
                        <Col xs={12} md={4} >
                            <img src={producto.image} alt={producto.title}  className="w-100 h-100"/>
                        </Col>

                        <Col xs={12} md={6} className="my-2 mx-auto "> 
                            <p className="fs-6">{producto.description}</p>
                            <span className="fs-5 fw-bold mt-3">${producto.price}</span>
                        </Col>
                    </Row>
                </Container>    

                </Modal.Body>

        </Modal>
        </>
    )
}