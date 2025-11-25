import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Tarjeta } from "./Tarjeta";
import { Cargar } from "./Cargar";
import { ErrorMessage } from "./ErrorMessage";
import { useState,useEffect } from "react";
import "../styles/custom.css"
import { Paginacion } from "./Paginacion";

export const Gallery = ({category}) => {
  
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(()=>{
    
        const fetchProducts = async () => {
          let url = "https://fakestoreapi.com/products";
          if(category) {
             url = `https://fakestoreapi.com/products/category/${category}`;
          }
    
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
    
    },[category]);

    
    const productosPorPagina = 8;
    const [paginaActual, setPaginaActual] = useState(1);

    //Calcular el indice de los productos a mostrar en la pagina actual
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;

    const productosActuales = products.slice(indicePrimerProducto, indiceUltimoProducto);

    //Cambiar de pagina
    const totalPages = Math.ceil(products.length / productosPorPagina);


    if(cargando) return <Cargar />
    if(error) return <ErrorMessage mensaje={error} />


    return(
        <Container className="my-5 mobile-margin">
            <Row className="g-4  ">
                
                {productosActuales.map((product)=>(
                    <Col   
                    key={product.id} 
                    xs={{ span: 10, offset: 1 }} 
                    sm={{ span: 6, offset: 0 }} 
                    md={4} 
                    lg={3}>
                        <Tarjeta 
                            producto = {product}
                        />
                    </Col>
                ))}

            </Row>
            <Paginacion 
              totalPages={totalPages} 
              paginaActual={paginaActual}
              onPageChange={setPaginaActual}
              />
        </Container>
    );
}