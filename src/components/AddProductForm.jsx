import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap"
import Swal from 'sweetalert2'

export const AddProductForm = ({onProductAdded}) => {

    const [product, setProduct] = useState({
        name:'',
        description:'',
        price:'',
    });
    const [errors, setErrors] = useState({});

    const onAdd = async (producto) => {
        let url = 'https://69029238b208b24affe67e78.mockapi.io/producto';
        try {
            const res = await fetch(url, {
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(producto)
            })
            if(!res.ok) {
                throw new Error("Error al agregar producto");
            }
            const data = await res.json();
            console.log('Produucto agregado:', data);
            Swal.fire({
                title: "Product added correctly!",
                icon: "success",
                confirmButtonColor: "#6c757d",
                draggable: true
            });
            if (onProductAdded) onProductAdded(); // Para refrescar la tabla
        } catch (error) { 
            console.error(error.message);
            Swal.fire({
                title: "Error!",
                text: "There was a problem adding the product.",
                icon: "error",
                draggable: true
            });
        }
    }

    //Validacion de formulario
    const validarFormulario = () => {
        const newErrors = {};
        const priceValue = Number(product.price);
        if (!product.name.trim()) {
            newErrors.name = "The name is required"
        }
        if (priceValue <= 0 || product.price.toString().trim() === "") {
            newErrors.price = "The price must be greater than 0"
        }

        if (!product.description.trim() || product.description.length < 10) {
            newErrors.description = "The description must be at least 10 characters long."
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    // Manejo de envio
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (validarFormulario()) {
            await onAdd(product);
            setProduct({name:'', description:'', price:''});
            setErrors({});
        }
    };

    // Actualizaciobn de estado del producto 
    const handleChange = (e) => {
        const {name,value} = e.target;
        setProduct({...product,  [name]: name === "price" ? Number(value) : value});
    }



    return(
            <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter the product name"
                        required
                        value={product.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control
                        as="textarea"
                        name="description"
                        placeholder="Write a product description"
                        required
                        value={product.description}
                        onChange={handleChange}
                        isInvalid={!!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                        
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control
                        type="number"
                        name="price"
                        placeholder="Enter the product price"
                        required
                        min={1}
                        value={product.price}
                        onChange={handleChange}
                        isInvalid={!!errors.price}
                        />
                        <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                
                <Button type="submit" variant="secondary" className="mb-3">Add product</Button>
                
                
            </Form>
    );
}