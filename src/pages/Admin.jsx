import { Button, Container, Modal, Form } from "react-bootstrap"
import { useContext, useState } from "react";
import { ListProducts } from "../components/ListProducts"
import { ProductsContext } from "../context/ProductsContext";

export const Admin = () => {

    const {onAdd, onEdit} = useContext(ProductsContext);
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        stock: '',
        image: '' 
    });
    const [editId, setEditId] = useState(null);

    const handleShowAdd = () => {
        setEditId(null);
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
        setForm({
            title: '',
            description: '',
            price: '',
            stock: '',
            image: '' 
        });
        setEditId(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = {
            ...form,
            price: Number(form.price),
            stock: Number(form.stock)
        }
        if(editId) {
            await onEdit(editId, productData);
        } else {
            await onAdd(productData);
        }

        handleClose();
    }

    const handleEditProduct = (product) => {
        setEditId(product.id);
        setForm({
            title: product.title,
            description: product.description,
            price: product.price,
            stock: product.stock,
            image: product.image
        });
        setShow(true);
    };

    return(
        <Container className="my-5">
            <h1 className="mb-3">Admin</h1>
            <p className="text-muted mb-4">Manage and organize your store inventory.</p>
            <Button variant="dark mb-3 fw-medium" onClick={handleShowAdd}>Add Product</Button>
            <ListProducts onEditProduct={handleEditProduct}/>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editId ? 'Edit':'Add'} product
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                            type="text"
                            value={form.title}
                            onChange={(e)=>setForm({...form, title:e.target.value})}
                            required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                            as="textarea"
                            value={form.description}
                            onChange={(e)=>setForm({...form, description:e.target.value})}
                            required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                            type="number"
                            value={form.price}
                            onChange={(e)=>setForm({...form, price:e.target.value})}
                            required
                            min={0} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                            type="number"
                            value={form.stock}
                            onChange={(e)=>setForm({...form, stock:e.target.value})}
                            required
                            min={0} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Image (URL)</Form.Label>
                            <Form.Control
                            type="text"
                            value={form.image}
                            onChange={(e)=>setForm({...form, image:e.target.value})}
                            required
                            />
                        </Form.Group>
                        <div className="container d-flex justify-content-center gap-3">
                            <Button type="submit" variant="success" className="mt-2 fw-medium">Save</Button>   
                            <Button variant="danger" className="mt-2 fw-medium" onClick={handleClose}>Cancel</Button>
                        </div>   
                                        
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
        
    )
}