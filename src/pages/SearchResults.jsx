import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Card, InputGroup } from "react-bootstrap";
import { Cargar } from "../components/Cargar";
import { ErrorMessage } from "../components/ErrorMessage";
import { useLocation } from "react-router-dom";
import { Tarjeta } from "../components/Tarjeta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons"
import "../styles/custom.css"

export const SearchResults = () => {

    const [products, setProducts] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const busqueda = queryParams.get("query") || "";
    const [showFilters, setShowFilters] = useState(false);


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

    let filtrados = products
    .filter((product) => product.title.toLowerCase().includes(busqueda.toLowerCase()))
    .filter(product => 
        minPrice === "" || product.price >= Number(minPrice)
    )
    .filter(product =>
        maxPrice === "" || product.price <= Number(maxPrice)
    )

    
    if(cargando) return <Cargar />
    if(error) return <ErrorMessage mensaje={error}/>


    return(
        <Container className="mt-5">
            {filtrados && (
                <h4 className="mb-3"> 
                    Results for: "{busqueda}"
                </h4>
            )}

            <button 
            type="button" 
            className="btn btn-ligth border mb-3" 
            onClick={()=>setShowFilters(!showFilters)}>
                <FontAwesomeIcon icon={faFilter} style={{color: "#333",}} />
            </button>

            <Row className="mt-3">
                {showFilters && (
                    <Col md={2} className="mb-4">
                            <Card className='p-3 mb-3 filters-panel'>
                                <h5 className='mb-3'>Filters</h5>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control 
                                        type='number'
                                        placeholder='Min Price'
                                        value={minPrice}
                                        onChange={(e)=>setMinPrice(e.target.value)}
                                        min={0} 
                                    />
                                </InputGroup>

                                <InputGroup className='mb-2'>
                                    <InputGroup.Text >$</InputGroup.Text>
                                    <Form.Control 
                                        type='number'
                                        placeholder='Max Price'
                                        value={maxPrice}
                                        onChange={(e)=>setMaxPrice(e.target.value)}
                                        min={0}
                                    />
                                </InputGroup>

                            </Card>
                    </Col>
                )}

                <Col md={showFilters ? 10:12}>
                    <Row>
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

                </Col>


            </Row>
        </Container>
    );
}