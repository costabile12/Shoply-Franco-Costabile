import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const ProductsContext = createContext();

export const ProductsProvider = ({children}) => {
    
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    const API = 'https://69029238b208b24affe67e78.mockapi.io/producto';

    //Cargar productos de la API
    const fetchProducts = async () => {

            try {
                const res = await fetch(API);
                if(!res.ok) {
                  if(res.status === 404) {
                    throw new Error("No se encontraron los productos (404)");
                  }else {
                    throw new Error(`Error HTTP: ${res.status}`);
                  }
                }
                const data = await res.json();
                setProducts(data || []);
            
              }catch(err){
                setError(err.message);
              }finally {
                setCargando(false);
              }
    };

    useEffect(()=>{
            fetchProducts();
    },[]);
    
    //Agregar Producto
    const onAdd = async (producto) => {
        
        try {
            const res = await fetch(API, {
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(producto)
            });
            if(!res.ok) {
                throw new Error("Error al agregar producto");
            }
            const data = await res.json();
            setProducts([...products, data]); // Actualiza la tabla sin recargar la pagina 

            Swal.fire({
                title: "Product added correctly!",
                icon: "success",
                confirmButtonColor: "#6c757d",
            });

        } catch (error) { 
            console.error(error.message);
            Swal.fire({
                title: "Error!",
                text: "There was a problem adding the product.",
                icon: "error",
            });
        }
    }

    //Editar Producto
    const onEdit = async (id, productoActualizado) => {
        try {
            const res = await fetch(`${API}/${id}`, {
                method:'PUT',
                headers : {'Content-Type':'application/json'},
                body: JSON.stringify(productoActualizado),
            });
            if(!res.ok) {
                throw new Error('Error al actualizar el producto.')
            }
            const data = await res.json();
            setProducts(products.map((p)=>(p.id === id ? data:p))); //Remplaza el producto editado
        } catch (error) {
            console.error(error.message);
            Swal.fire({
                title: "Error!",
                text: "There was a problem editing the product.",
                icon: "error",
            });
            
        }
    }

    //Borrar Producto
    const onDelete = async (id) => {

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        // Solo borra si confirma
        if (!result.isConfirmed) return;

        try {
            await fetch(`${API}/${id}`, {
            method:'DELETE'
            });

            // Actualiza listado sin recargar página
            setProducts(products.filter((p) => p.id !== id));

            Swal.fire({
            title: "Deleted!",
            text: "The product has been removed.",
            icon: "success"
            });

        } catch (error) {
        Swal.fire({
        title: "Error!",
        text: "There was a problem deleting the product.",
        icon: "error",
        });
    }
    };
    return(
        <ProductsContext.Provider value={{products, cargando, error, onAdd, onEdit, onDelete}}>
            {children}
        </ProductsContext.Provider>
    );
};