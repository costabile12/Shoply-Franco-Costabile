import {Container, Navbar, Nav, NavDropdown, Form, Button, Row, Col, Card  } from "react-bootstrap";
import "../styles/custom.css"
import Logo from '../assets/img/logo.png';
import "../styles/custom.css"
import { Carrito } from "./Carrito";
import { useAuthContext } from "../context/AuthContext";
import {Link, useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser, faMagnifyingGlass, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { Cargar } from "./Cargar";
 
export const Navegation = () => {

    const navigate = useNavigate();
    const {token} = useAuthContext();
    const {logout} = useAuthContext();
    const [busqueda, setBusqueda] = useState("");
    const [products, setProducts] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

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

    const handleLogout = () => {
        logout();
        Swal.fire({
            icon: "info",
            title: "Logged out",
            text: "You have successfully logged out.",
            timer: 2000,
            showConfirmButton: false,
        });
        navigate("/login")
        
        

    }

    const filtrados = products.filter((p)=> p.title.toLowerCase().includes(busqueda.toLowerCase()));


    if(cargando) return <Cargar />
    if(error) return <ErrorMessage mensaje={error} />

    return(
        <>
        <Navbar bg="light" expand="lg" className="p-1" >
            <Container >

                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 mx-3 mb-1">
                <img src={Logo} alt="Logo" width={55} height={55} />
                <h2 className="title-responsive-nav fw-semibold mb-0 ">SHOPLY</h2>
                </Navbar.Brand>
                
                
                <Navbar.Toggle />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto fw-semibold gap-3 ms-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <NavDropdown title="Shop" id="basic-nav-dropdown" >
                        <NavDropdown.Item as={Link} to="/mens-clothing">Men's clothing</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/womens-clothing">Women's clothing</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/jewelery">Jewelery</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/electronics">Electronics</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link as={Link} to="/about">About</Nav.Link>
                    <Nav.Link as={Link} to="/contact">Contact</Nav.Link>

                    {/* Solo se muestra si esta autenticado */}
                    {token && (
                        <Nav.Link as={Link} to="/admin" >Admin</Nav.Link>
                    ) }
                    
                </Nav>

                
                
                
                    <Form 
                    className="d-flex ms-auto align-items-center"  
                    onSubmit={(e) => e.preventDefault()}>
                    <Form.Control type="text" placeholder="Search" className="me-2"  value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
                    <Button type="submit" className="btn btn-dark mx-2" aria-label="Search" title="Search"  >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
                    <Carrito />

                   {!token ? (
                    <Link  to="/login">
                        <Button  type="button" className="btn btn-dark ms-2" aria-label="Login" title="Login">
                            <FontAwesomeIcon icon={faUser} style={{color: "#fafcff"}} />

                        </Button>
                    </Link>):(
                        <Button  type="button" className="btn btn-dark ms-2" aria-label="Log out" title="Log out" onClick={handleLogout}>
                            <FontAwesomeIcon icon={faRightFromBracket} style={{color: "#f5f0f0",}} />

                        </Button>
                    )}


                    </Form>
                

                </Navbar.Collapse>
            </Container>
        </Navbar>
          
        {busqueda && (
            <Container className="mt-4">
            <h4>Resultados para: "{busqueda}"</h4>
            {filtrados.length > 0 ? (
                <Row className="mt-3">
                {filtrados.map((p) => (
                    <Col key={p.id} md={3} className="mb-3">
                    <Card className="p-2 text-center h-100">
                        <Link to={`/producto/${p.id}`} onClick={()=>setBusqueda("")}>
                            <Card.Img
                            variant="top"
                            src={p.image}
                            alt={p.title}
                            style={{ height: "150px", objectFit: "contain" }}
                            />
                        </Link>

                        <Card.Body>
                        <Link to={`/producto/${p.id}`} onClick={()=>setBusqueda("")}>
                            <Card.Title style={{ fontSize: "0.9rem" }}>{p.title}</Card.Title>
                        </Link>
                        <Card.Text className="fs-5 fw-semibold ">${p.price}</Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
                </Row>
            ) : (
                <p>No se encontraron resultados.</p>
            )}
            </Container>
        )}
        </>

    );
};