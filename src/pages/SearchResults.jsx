import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Cargar } from "../components/Cargar";
import { ErrorMessage } from "../components/ErrorMessage";
import { useLocation } from "react-router-dom";
import { Tarjeta } from "../components/Tarjeta";

export const SearchResults = () => {

    const [products, setProducts] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const busqueda = queryParams.get("query") || "";


    useEffect(()=>{
        const fetchProducts = async () => {
            const URL = "https://fakestoreapi.com/products"
            try {
                const res = await fetch(URL);
                if(!res.ok) {
                    if(res.status === 404) {
                        throw new Error("No se encontraron los productos (404)");
                    } else {
                        throw new Error(`Error HTTP: ${res.status}`);
                    }
                }
                const data = await res.json();
                setProducts(data || []);
                
            } catch (err) {
                setError(err.message)
            } finally {
                setCargando(false)
            }
        }
        fetchProducts();
    },[busqueda]);

    let filtrados = products.filter((product) => product.title.toLowerCase().includes(busqueda.toLowerCase()));

    if(cargando) return <Cargar />
    if(error) return <ErrorMessage mensaje={error}/>


    return(
        <Container className="mt-5">
            {filtrados && (
                <h4>
                    Results for: "{busqueda}"
                </h4>
            )}
            <Row className="mt-3">
                {filtrados.length > 0 ? (
                    filtrados.map((p)=>(
                    <Col key={p.id} md={6} lg={4} xl={3} className="mb-3">
                        <Tarjeta producto={p}/>
                    </Col>
                ))) :
                (
                    <p>
                        No products found.
                    </p>
                )
            }

            </Row>
        </Container>
    );
}