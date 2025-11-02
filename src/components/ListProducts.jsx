import { useEffect, useState } from 'react';
import {Button, Table} from 'react-bootstrap'
import { Cargar } from './Cargar';
import { ErrorMessage } from './ErrorMessage';

export const ListProducts = ({productos}) => {

 
    return(
        <Table striped bordered hover >
            <thead>
                <tr className='text-center'>
                    <th>
                        ID
                    </th>
                    <th>
                        Name
                    </th>
                    <th>
                        Description
                    </th>
                    <th>
                        Price
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody >
                {productos.map((producto)=>(
                    <tr key={producto.id} >
                        <td>{producto.id}</td>
                        <td>{producto.name}</td>
                        <td>{producto.description}</td>
                        <td>{producto.price}</td>
                        <td className='d-flex justify-content-center align-items-center gap-3' >
                            <Button variant='warning'>Edit</Button>
                            <Button variant='danger'>Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}