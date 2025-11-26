import React from "react";
import { Pagination } from "react-bootstrap";

export const Paginacion = ({ totalPages, paginaActual, onPageChange }) => {

    if (totalPages <= 1) return null;

    const cambiarPagina = (page) => {
        if (page < 1 || page > totalPages) return;
        onPageChange(page);
    };

    const page1 = paginaActual - 2;
    const page2 = paginaActual - 1;
    const page3 = paginaActual + 1;
    const page4 = paginaActual + 2;

    return (
    <>
    {/* PAGINACION PARA ESCRITORIO */}
        <Pagination className="justify-content-center my-3 d-none d-md-flex">
            {/* Volver al la primera pagina */}
            <Pagination.First
            disabled={paginaActual === 1}
            onClick={() => cambiarPagina(1)} />

            {/* Ir a la pagina anterior de la actual */}
            <Pagination.Prev 
            disabled={paginaActual === 1}
            onClick={() => cambiarPagina(paginaActual-1)}/>

            <Pagination.Item
            active={paginaActual === 1}
            onClick={() => cambiarPagina(1)}>
                1
            </Pagination.Item>

            {/* Ellipsis de izquierda */}
            {paginaActual > 4 && (<Pagination.Ellipsis disabled/>)}

            {/* paginaActual - 2 */}
            {page1 > 1 && page1 < totalPages && (
                <Pagination.Item 
                onClick={()=>cambiarPagina(page1)}>
                    {page1}
                </Pagination.Item>
            )}
            
            {/* paginaActual - 1 */}
            {page2 > 1 && page2 < totalPages && (
                <Pagination.Item onClick={()=>cambiarPagina(page2)}>
                    {page2}
                </Pagination.Item>
            )}
        
            {/* paginaActual */}
            {paginaActual !== 1 && paginaActual !== totalPages && (
                <Pagination.Item active>
                    {paginaActual}
                </Pagination.Item>
            )}
            
            {/* paginaActual + 1 */}
            {page3 > 1 && page3 < totalPages && (
                <Pagination.Item onClick={()=>cambiarPagina(page3)}>
                    {page3}
                </Pagination.Item>
            ) }
            
            {/* paginaActual + 2 */}
            {page4 > 1 && page4 < totalPages && (
                <Pagination.Item onClick={()=>cambiarPagina(page4)}>
                    {page4}
                </Pagination.Item>
            )}
        
            {/* Ellipsis de derecha */}
            {paginaActual < totalPages - 3 && (
                <Pagination.Ellipsis disabled />
            )}

            {/* Ultima pagina */}
            {totalPages !== 1  && (
                <Pagination.Item
                active={paginaActual === totalPages}
                onClick={() => cambiarPagina(totalPages)}>
                    {totalPages}
                </Pagination.Item>
            )}
            
            {/*Ir a la pagina siguiente */}
            <Pagination.Next 
            disabled={paginaActual === totalPages}
            onClick={() => cambiarPagina(paginaActual+1)}/>
            
            {/* Ir a la ultima pagina */}
            <Pagination.Last 
            disabled={paginaActual === totalPages}
            onClick={()=>cambiarPagina(totalPages)}/>
        </Pagination>

        {/* PAGINACION PARA MOVILES */}
        <Pagination className="justify-content-center my-3 d-flex d-md-none">
            {/* Volver al la primera pagina */}
            <Pagination.First
            disabled={paginaActual === 1}
            onClick={() => cambiarPagina(1)} />

            {/* Ir a la pagina anterior de la actual */}
            <Pagination.Prev 
            disabled={paginaActual === 1}
            onClick={() => cambiarPagina(paginaActual-1)}/>

            {/* paginaActual */}
            <Pagination.Item >
                {paginaActual}
            </Pagination.Item>
            
            <Pagination.Item >
                /
            </Pagination.Item>
            
            
            {/* Cantidad de paginas */}
            <Pagination.Item>
                {totalPages}
            </Pagination.Item>

            {/*Ir a la pagina siguiente */}
            <Pagination.Next 
            disabled={paginaActual === totalPages}
            onClick={() => cambiarPagina(paginaActual+1)}/>
            
            {/* Ir a la ultima pagina */}
            <Pagination.Last 
            disabled={paginaActual === totalPages}
            onClick={()=>cambiarPagina(totalPages)}/>


        </Pagination >
    </>

    );
};