import { Container, Row, Col, Form, Button, Card } from "react-bootstrap"

export const Login = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Login enviado');
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="w-100 justify-content-center ">
            <Col xs={10} md={8} lg={6}>
            <Card className="shadow-lg p-4 ">
                <Card.Body>
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your E-mail" required  pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" required />
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