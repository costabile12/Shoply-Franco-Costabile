import { useState, useEffect } from "react";

import  {Button, Form, Row, Col} from "react-bootstrap"
import { Cargar } from "./Cargar";

import "../styles/custom.css"
import { ErrorMessage } from "./ErrorMessage";

export const Formulario = () => {

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [provincia, setProvincia] = useState("");
    const [phone, setPhone] = useState("");
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        
        const form = e.currentTarget;
        
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }else{ 
            alert("Datos enviados correctamente");
            setFirstName("");
            setLastname("");
            setEmail("");
            setProvincia("");
            setPhone("");
        }
        


        setValidated(true)

    }

    const [options, setOptions] = useState([]);

    useEffect(()=>{

        const fetchProvincias = async () => {
            try {
                const res = await fetch("https://apis.datos.gob.ar/georef/api/provincias");
                if(!res.ok){
                    throw new Error("Ocurrio un error al cargar las provincias,", res.status)
                }
                const data = await res.json();
                setOptions(data.provincias || []);

            } catch (err) {
                setError(err.message);
            }finally{
                setCargando(false);
            }


        }
        fetchProvincias();
        
    },[])

    if(cargando) return <Cargar />
    if(error) return <ErrorMessage mensaje={error} />

    return(
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="my-4 w-100 ">
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Write your first name"
                        value={firstname}
                        onChange={(e)=>setFirstName(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">  
                        Please write your first name.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Write your last name"
                        value={lastname}
                        onChange={(e)=>setLastname(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">  
                        Please write your last Name.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="user@account.com"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">  
                        Please write your email.
                    </Form.Control.Feedback>
                </Form.Group>
                
            </Row>
            
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Province</Form.Label>
                    <Form.Select 
                    value={provincia}
                    onChange={(e) => setProvincia(e.target.value)}
                    required
                    >
                    <option value="">Select...</option>
                    {options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.nombre}
                        </option>
                    ))}
                    </Form.Select>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">  
                            Please select one.
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                    type="text"
                    required
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                    pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                    placeholder="123-1234-1234"
                    />
                </Form.Group>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">                       
                    Please write your phone number.
                </Form.Control.Feedback>
            </Row>
            <Row>
                <Form.Group as={Col} md="12"  className="mb-3">
                    <Form.Label>
                        Write your Message
                    </Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                        required
                       
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">                       
                        Please write your message
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            
            <div className="d-flex d-flex justify-content-end ">
                <Button type="submit" variant="dark"  >Submit form</Button>    
            </div>
            

        </Form>
    );
};