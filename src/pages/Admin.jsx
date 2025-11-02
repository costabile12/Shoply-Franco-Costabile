import { Container } from "react-bootstrap"
import { AddProductForm } from "../components/AddProductForm"
import { ListProducts } from "../components/ListProducts"
import { useEffect, useState } from "react"
import { Cargar } from "../components/Cargar"
import { ErrorMessage } from "../components/ErrorMessage"

export const Admin = () => {

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const fetchProductos = async () => {
        let url = 'https://69029238b208b24affe67e78.mockapi.io/producto';
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("No se encontraron productos");
            }
            const data = await res.json()
            setProductos(data || []);

            } catch (error) {
                console.error(error.message);
                setError(error.message)
            } finally {
                setCargando(false);
            }
    }
    useEffect(()=>{
        fetchProductos();
    },[]);

    if(cargando) return <Cargar />
    if(error) return <ErrorMessage mensaje={error}/>

    return(
        <Container className="my-5">
            <h1>Admin</h1>
            <AddProductForm onProductAdded={fetchProductos} />
            <ListProducts  productos={productos} />
        </Container>
        
    )
}