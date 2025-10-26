import { useEffect, useState } from "react";
import { Container,Row, Col, Button, Card } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { Cargar } from "../components/Cargar";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

import "../styles/custom.css"

export const DetalleProducto = () => {

    const {id} = useParams();

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    
    useEffect(()=>{
        
        const fetchProducts = async () => {
        let url = "https://fakestoreapi.com/products";

        try {
            const res = await fetch(url);
            if(!res.ok) {
                if(res.status === 404) {
                    throw new Error("No se encontraron los productos (404)");
                }else {
                    throw new Error(`Error HTTP: ${res.status}`);
                }
            }
            const data = await res.json();
            setProducts(data || []);
            
            }catch(err){
                setError(err.message);
            }finally {
                setCargando(false);
            }
        };
        
        fetchProducts();
        
    },[]);

    const {handleAddToCart} = useContext(CarritoContext);
    
        if(cargando) return <Cargar />
        if(error) return <ErrorMessage mensaje={error} />
    
    let producto = products.find((p) => p.id == id);

 


    return(
        <Container className="my-5 mobile-margin">
            <Row className="gap-4">
                <Col className="d-flex justify-content-center" xs={12} md={4}>
                <Card className="p-2 shadow h-100">
                    
                        <Card.Img src={producto.image} alt={producto.title} className="w-100 h-100" />
                    

                </Card>
                    
                </Col>
                <Col xs={12} md={6} className="mx-auto">
                    <h1>{producto.title}</h1>
                    <p className="fst-italic">{producto.description}</p>
                    <span className="fs-1 fw-semibold ">${producto.price}</span>
                    <div className="my-4 d-flex justify-content-end align-items-center">
                        <Button 
                        variant="secondary" 
                        type="button" 
                        className="btn-lg" 
                        onClick={() => handleAddToCart(producto)}>Add to cart</Button>
                    </div>
                </Col>
            </Row>

            
        </Container>
    )
}