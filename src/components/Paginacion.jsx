import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const Paginacion = ({totalPages,paginaActual,onPageChange}) => {

    if (totalPages <= 1) return null

    const cambiarPagina = (page) => {
        if (page < 1 || page > totalPages) return
        onPageChange(page);
    }
    return(
        <div className="d-flex justify-content-center my-4">
            <button
                className="btn btn-outline-primary mx-1"
                onClick={() => cambiarPagina(paginaActual - 1)}
                disabled={paginaActual === 1}
            >
                <FaArrowLeft />
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    className={`btn mx-1 ${
                        paginaActual === index + 1 ? "btn-dark" : "btn-outline-dark"
                    }`}
                    onClick={() => cambiarPagina(index + 1)}
                >
                    {index + 1}
                </button>
            ))}

            <button
                className="btn btn-outline-primary mx-1"
                onClick={() => cambiarPagina(paginaActual + 1)}
                disabled={paginaActual === totalPages}
            >
                <FaArrowRight />
            </button>
        </div>
    )
}