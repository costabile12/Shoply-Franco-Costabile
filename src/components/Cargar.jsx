import Spinner from "react-bootstrap/Spinner";

export const Cargar = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 gap-3">
      <Spinner animation="border" variant="dark" role="status" />
      <p className="fs-5">Loading...</p>
    </div>
  );
};