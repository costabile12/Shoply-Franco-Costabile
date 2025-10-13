import React from "react";
import { Container, Row, Card, Col } from "react-bootstrap";

export const Branches = () => {
const branches = [
{
id: 1,
name: "Central Branch",
address: "Av. Santa Fe 1234, CABA, Buenos Aires",
phone: "+54 (11) 4321-1234",
hours: "Lunes a Sábado: 10:00 – 20:00 | Domingo: Cerrado",
},
{
id: 2,
name: "Palermo Branch",
address: "Honduras 5678, Palermo, CABA, Buenos Aires",
phone: "+54 (11) 4567-8901",
hours: "Lunes a Viernes: 11:00 – 19:00 | Sábado: 11:00 – 15:00",
},
{
id: 3,
name: "San Isidro Branch",
address: "Av. del Libertador 2345, San Isidro, Buenos Aires",
phone: "+54 (11) 4789-2233",
hours: "Lunes a Sábado: 10:00 – 18:00 | Domingo: Cerrado",
},
];

return ( 

    <Container className="my-5"> 
    <h1>Our Branches</h1> 
    <p>You can visit us at any of our branches in Buenos Aires:</p> 
    <Row className="d-flex justify-content-around w-100 mt-5 mx-auto">

        {branches.map((branch) => ( 

        <Col key={branch.id} xs={12} sm={8} md={8} lg={3}>
            <Card >
                <Card.Body>
                    <Card.Title>{branch.name}</Card.Title>
        
                    <Card.Text className="d-flex flex-column">
                        <span className="card-text"> <strong>Address:</strong> {branch.address} </span> 
                        <span className="card-text"> <strong>Phone:</strong> {branch.phone} </span> 
                        <span className="card-text"> <strong>Business Hours:</strong> {branch.hours} </span>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>

        ))} 
    </Row> 

    </Container>
);
}
