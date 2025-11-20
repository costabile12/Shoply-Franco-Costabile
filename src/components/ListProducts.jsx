
import { Form, Card, InputGroup, Row, Col } from 'react-bootstrap'
import { Cargar } from './Cargar';
import { ErrorMessage } from './ErrorMessage';
import { useContext, useState } from "react"
import { ProductsContext } from "../context/ProductsContext"
import '../styles/custom.css'
import { CrudProducts } from './CrudPoducts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons'

export const ListProducts = ({onEditProduct}) => {
    const {products, error, cargando} = useContext(ProductsContext); 
    const [search, setSearch] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [stockFilter, setStockFilter] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const filteredProducts = products
    .filter( product => 
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) 
    )
    .filter(product => 
        minPrice === "" || product.price >= Number(minPrice)
    )
    .filter(product =>
        maxPrice === "" || product.price <= Number(maxPrice)
    )
    .filter(product =>{
            if (stockFilter === "with") return product.stock > 0
            if (stockFilter === "without") return product.stock === 0;
            return true; //sin filtro
        }
    )


    if(cargando) return <Cargar />
    if(error) return <ErrorMessage mensaje={error}/>

    return(
        <div>
            <button className='btn btn-ligth border mb-3' onClick={()=>setShowFilters(!showFilters)}>
                <FontAwesomeIcon icon={faFilter} style={{color: "#333",}} />
            </button>
            <Row>
                
                {/* PANEL DE FILTROS */}
                {showFilters && (
                    <Col md={3} className='mb-3'>
                        <Card className='p-3 mb-3 filters-panel'>
                            <h5 className='mb-3'>Filters</h5>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control 
                                    type='number'
                                    placeholder='Min Price'
                                    value={minPrice}
                                    onChange={(e)=>setMinPrice(e.target.value)}
                                    min={0} 
                                />
                            </InputGroup>

                            <InputGroup className='mb-2'>
                                <InputGroup.Text >$</InputGroup.Text>
                                <Form.Control 
                                    type='number'
                                    placeholder='Max Price'
                                    value={maxPrice}
                                    onChange={(e)=>setMaxPrice(e.target.value)}
                                    min={0}
                                />
                            </InputGroup>

                            <Form.Select value={stockFilter} onChange={(e)=>setStockFilter(e.target.value)}>
                                <option value="">All Stock</option>
                                <option value="with">With Stock</option>
                                <option value="without">Without Stock</option>
                            </Form.Select>
                                
                        </Card>

                    </Col>
                )}
                

                <Col md={showFilters ? 9:12}>
                    <Form.Control 
                    type='text'
                    placeholder='Search...'
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    className='mb-3'/>


                    <CrudProducts 
                    products={filteredProducts.length > 0 ? filteredProducts:[]}
                    onEditProduct={onEditProduct}/>                
                </Col>
            </Row>
        </div>




    );
}