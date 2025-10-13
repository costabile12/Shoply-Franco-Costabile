import {Container, Navbar, Nav, NavDropdown, Form, Button  } from "react-bootstrap";
import "../styles/custom.css"
import Logo from '../assets/img/logo.png';
import "../styles/custom.css"
import { Carrito } from "./Carrito";

import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
 
export const Navegation = ({carrito, handleClean, handleDeleteProductCart, handleIncreanseQuantity, handleDecreanseQuantity}) => {

        

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
                    <Nav.Link as={Link} to="/admin" disabled>
                        Admin
                    </Nav.Link>
                </Nav>

                
                
                
                    <Form className="d-flex ms-auto align-items-center">
                    <Form.Control type="text" placeholder="Search" className="me-2" />
                    <Button type="submit" className="btn btn-dark mx-2" aria-label="Search" title="Search">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
                    <Carrito carrito={carrito} handleClean={handleClean} handleDeleteProductCart={handleDeleteProductCart} handleIncreanseQuantity={handleIncreanseQuantity} handleDecreanseQuantity={handleDecreanseQuantity}/>

                   
                    <Link  to="/login">
                        <Button  type="button" className="btn btn-dark ms-2" aria-label="Login" title="Login">
                            <FontAwesomeIcon icon={faUser} style={{color: "#fafcff"}} />

                        </Button>
                    </Link>

                    </Form>
                

                </Navbar.Collapse>
            </Container>
        </Navbar>
          
        
        </>

    );
};