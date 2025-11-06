
import {Button, Container, Table} from 'react-bootstrap'
import { Cargar } from './Cargar';
import { ErrorMessage } from './ErrorMessage';
import { useContext } from "react"
import { ProductsContext } from "../context/ProductsContext"
import '../styles/custom.css'

export const ListProducts = ({onEditProduct}) => {
    const {products, error, cargando, onDelete} = useContext(ProductsContext); 



    if(cargando) return <Cargar />
    if(error) return <ErrorMessage mensaje={error}/>

    return(
        <div className="table-responsive">
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th>
                            ID
                        </th>
                        <th>
                            Title
                        </th>
                        <th>
                            Description
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Stock
                        </th>
                        <th>
                            Image
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody >
                    {products.map((producto)=>(
                        <tr key={producto.id} >
                            <td>{producto.id}</td>
                            <td className="title-cell">{producto.title}</td>
                            <td className='desc-cell'>{producto.description}</td>
                            <td>{producto.price}</td>
                            <td>{producto.stock}</td>
                            <td className='text-center'>
                                {producto.image?.startsWith('http') ? (
                                    <img 
                                    src={producto.image} 
                                    alt={producto.title}
                                    className="product-img" />
                                    ) : (
                                    <span>{producto.image}</span>)}
                            </td>
                            <td className='text-center actions-cell '>
                                <Button variant='warning' className='me-3 fw-medium' onClick={()=>onEditProduct(producto)}>Edit</Button>
                                <Button variant='danger' className='me-3 fw-medium' onClick={()=>onDelete(producto.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>            
        </div>


    );
}