
import { Form } from 'react-bootstrap'
import { Cargar } from './Cargar';
import { ErrorMessage } from './ErrorMessage';
import { useContext, useState } from "react"
import { ProductsContext } from "../context/ProductsContext"
import '../styles/custom.css'
import { CrudProducts } from './CrudPoducts';

export const ListProducts = ({onEditProduct}) => {
    const {products, error, cargando} = useContext(ProductsContext); 
    const [search, setSearch] = useState("");

    const filteredProducts = products.filter( product => 
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) 
    );


    if(cargando) return <Cargar />
    if(error) return <ErrorMessage mensaje={error}/>

    return(
        <div className='container'>
            <Form.Control 
            type='text'
            placeholder='Search...'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className='mb-3'/>
            <CrudProducts 
            products={filteredProducts.length > 0 ? filteredProducts:products}
            onEditProduct={onEditProduct}/>

        </div>




    );
}