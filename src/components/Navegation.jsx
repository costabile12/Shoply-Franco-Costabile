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
import { useState } from "react";


export const Navegation = () => {

    const navigate = useNavigate();
    const { token, role, logout } = useAuthContext();
    const [busqueda, setBusqueda] = useState("");
    const [expanded, setExpanded] = useState(false);

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
        setExpanded(false);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (busqueda.trim() !== "") {
            navigate(`/buscar?query=${encodeURIComponent(busqueda)}`);
            setBusqueda("");
            setExpanded(false);
        }
    }

    return(
        <>
        <Navbar bg="light" expand="lg" className="p-1" expanded={expanded}  onToggle={(val) => setExpanded(val)}>
            <Container >

                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 mx-3 mb-1" onClick={() => setExpanded(false)}>
                <img src={Logo} alt="Logo" width={55} height={55} />
                <h2 className="title-responsive-nav fw-semibold mb-0 ">SHOPLY</h2>
                </Navbar.Brand>
                
                
                <Navbar.Toggle />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto fw-semibold gap-3 ms-auto mb-3">
                    <Nav.Link as={Link} to="/" onClick={()=>setExpanded(false)}>Home</Nav.Link>
                    <NavDropdown title="Shop" id="basic-nav-dropdown" >
                        <NavDropdown.Item as={Link} to="/mens-clothing" onClick={()=>setExpanded(false)}>Men's clothing</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/womens-clothing" onClick={()=>setExpanded(false)}>Women's clothing</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/jewelery" onClick={()=>setExpanded(false)}>Jewelery</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/electronics" onClick={()=>setExpanded(false)}>Electronics</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="/offers" className="fw-bold" onClick={()=>setExpanded(false)}>Offers</NavDropdown.Item>

                    </NavDropdown>
                    <Nav.Link as={Link} to="/about" onClick={()=>setExpanded(false)}>About</Nav.Link>
                    <Nav.Link as={Link} to="/contact" onClick={()=>setExpanded(false)}>Contact</Nav.Link>

                    {/* Solo se muestra si esta autenticado */}
                    {role === "admin" && (
                        <Nav.Link as={Link} to="/admin" onClick={()=>setExpanded(false)}>Admin</Nav.Link>
                    ) }
                    
                </Nav>
                
                    <Form 
                    className="d-flex ms-auto align-items-center"  
                    onSubmit={handleSearch}>
                    <Form.Control 
                    type="text" 
                    placeholder="Search..." 
                    className="me-2"
                    value={busqueda}
                    onChange={(e)=>setBusqueda(e.target.value)} />
                    <Button 
                    type="submit" className="btn btn-dark mx-2" aria-label="Search" title="Search">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>

                    
                    <Carrito />

                   {!token ? (
                    <Link  to="/login" onClick={()=>setExpanded(false)}>
                        <Button  type="button" className="btn btn-dark ms-2" aria-label="Login" title="Login" >
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
          
 
        </>

    );
};