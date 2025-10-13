import React from "react"
import { Container } from "react-bootstrap"
import Video from "../assets/video/video.mp4"
import "../styles/custom.css"

export const VideoBanner = () => {
    return(
        <Container fluid className="mb-2 p-0 height-video ">
            <video src={Video} className="object-fit-cover w-100 h-100" autoPlay loop muted playsInline>
                No se pudo reproducri el video
            </video>


        </Container>
        
    );
};