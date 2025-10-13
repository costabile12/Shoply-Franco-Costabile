import Spinner from "react-bootstrap/Spinner";

export const Cargar = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 gap-3">
      <p className="fs-5">Cargando...</p>
      <Spinner animation="border" variant="dark" role="status" />
    </div>
  );
};