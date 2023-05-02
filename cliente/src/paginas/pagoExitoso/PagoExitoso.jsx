import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import nuevaSolicitud from "../../utiles/nuevaSolicitud";
import "./PagoExitoso.scss"

const PagoExitoso = () => {
  const { search } = useLocation();
  const navegar = useNavigate();
  const parametros = new URLSearchParams(search);
  const intento_de_pago = parametros.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await nuevaSolicitud.put("/contrataciones", { intento_de_pago });
        setTimeout(() => {
          navegar("/contrataciones");
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    };

    makeRequest();
  }, []);

  return (
    <div className="mensajeConfirmacion">
        <h2>¡Pago exitoso!</h2>
        <p>Está siendo redirigido a la página de contrataciones...</p> 
    </div>
  );
};

export default PagoExitoso;