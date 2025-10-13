import {Button, Carousel} from "react-bootstrap"

import "../styles/custom.css"

import imagen1 from "../assets/img/banner1.png"
import imagen2 from "../assets/img/banner2.png"
import imagen3 from "../assets/img/banner3.png"


export const Carrusel = () => {

    const banners = [

        {
            src:imagen1,
            name: "Style that defines you",
            description:"“Discover our new collection of garments that combine comfort and trend. Update your look today!”"
        },
        {
            src:imagen2,
            name: "Technology that simplifies your life",
            description:"“The most innovative gadgets and devices are just a click away. Transform your routine with the latest in technology!”"
        },
        
                {
            src:imagen3,
            name: "Shine with every detail",
            description:"“Choose unique accessories that enhance your style. Jewelry for every occasion, from classic to modern.”"
        }
        
        
    ]


  return (
    
    <Carousel fade className=" mb-5">

        {banners.map((banner,index)=>(
            <Carousel.Item key={index}>
                <img src={banner.src} alt={banner.name} className="w-100 h-75 img-fluid" style={{ maxHeight: "90vh", }}/>
                <Carousel.Caption className="text-shadow-dark">
                    <h3 className="titleCarrusel">{banner.name}</h3>
                    <p className="textCarrusel">{banner.description}</p>
                    <Button role="button" href="/#allProducts" className="btn btn-dark btn-outline-light btn-lg " aria-label="See products" title="See products">Products</Button>
                    </Carousel.Caption>
            </Carousel.Item>
        ))}

    </Carousel>

    )
}

