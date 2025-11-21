import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap"
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Login = () => {

    const [user, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useAuthContext();
    const navigate = useNavigate();
    
    const handleLogin = (e) => {
        
        e.preventDefault();

        const result = login(user, password)
        // Login incorrecto
        if (!result.success) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${result.message}`,
                            
            });
            return;
        }

        //Login correcto 
        Swal.fire({
            title: "Login successful!!",
            text: `Welcome back, ${result.user.username}!`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
        });

        //Manejo de redireccion 
        if (result.user.role === "admin") {
            navigate("/admin");
        } else {
            navigate("/"); 
        }
            

    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="w-100 justify-content-center ">
            <Col xs={10} md={8} lg={6}>
            <Card className="shadow-lg p-4 ">
                <Card.Body>
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={handleLogin} noValidate >
                    <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter your username" 
                    required
                    autoComplete="username"
                    onChange={(e)=>setUsuario(e.target.value)} />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Enter your password" 
                    required
                    autoComplete="current-password"
                    onChange={(e)=>setPassword(e.target.value)} />

                    </Form.Group>

                    <Button variant="dark" type="submit" className="w-100">
                    Sign in
                    </Button>
                </Form>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        </Container>
    )
}