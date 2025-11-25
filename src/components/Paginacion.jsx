import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const Paginacion = ({ totalPages, paginaActual, onPageChange }) => {

    if (totalPages <= 1) return null;

    const cambiarPagina = (page) => {
        if (page < 1 || page > totalPages) return;
        onPageChange(page);
    };

    return (
        <div className="d-flex justify-content-center align-items-center my-4 gap-2">

            {/* Botón Anterior */}
            <button
                className="btn btn-outline-primary"
                onClick={() => cambiarPagina(paginaActual - 1)}
                disabled={paginaActual === 1}
            >
                <FaArrowLeft />
            </button>

            {/* --- Vista de ESCRITORIO: Mostrar TODAS las páginas --- */}
            <div className="d-none d-md-flex">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`btn mx-1 ${
                            paginaActual === index + 1
                                ? "btn-dark"
                                : "btn-outline-dark"
                        }`}
                        onClick={() => cambiarPagina(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* --- Vista MÓVIL: Mostrar solo número actual --- */}
            <span className="d-md-none fw-bold px-3">
                {paginaActual} / {totalPages}
            </span>

            {/* Botón Siguiente */}
            <button
                className="btn btn-outline-primary"
                onClick={() => cambiarPagina(paginaActual + 1)}
                disabled={paginaActual === totalPages}
            >
                <FaArrowRight />
            </button>
        </div>
    );
};