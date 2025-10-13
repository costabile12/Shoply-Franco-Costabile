import React from "react";
import Logo from "../assets/img/logo.png"
import { NavFoot } from "./NavFoot";
import { Container } from "react-bootstrap";

export const Footer = () => {
    return(
        <footer className="bg-dark text-center px-5 py-3 text-white border-top shadow-sm position-relative bottom-0 w-100 mt-auto "> 
            <Container>
                <NavFoot />

                <div className="d-flex justify-center justify-content-center mb-2">
                    <img src={Logo} alt="Logo"  width={65} height={65}/>
                </div>
                <p>&copy;2025 by Franco Costabile</p> 
            </Container>

        </footer>            
    );
}         