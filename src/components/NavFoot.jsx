import React from "react"

import {Nav} from "react-bootstrap"
import { Link } from "react-router-dom";

export const NavFoot = () => {
    return(
        <Nav className="d-flex justify-content-center mb-2 ">
            <Nav.Item>
                <Nav.Link as={Link} to="/" className="text-light-emphasis">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  as={Link} to="/exchanges-returns" className="text-light-emphasis">Exchanges and Returns</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  as={Link} to="/shipping" className="text-light-emphasis">Shipping</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  as={Link} to="/branches" className="text-light-emphasis">Branch Offices</Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

