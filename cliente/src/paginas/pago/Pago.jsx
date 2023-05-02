import React, { useEffect, useState } from "react";
import "./Pago.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import FormularioPago from "../../componentes/formularioPago/FormularioPago";
import nuevaSolicitud from "../../utiles/nuevaSolicitud";

const stripePromise = loadStripe(
  process.env.STRIPE_PRUEBA
);

const Pago = () => {
  const [clientSecret, setClientSecret] = useState("");

  const [solicitudEnviada, setSolicitudEnviada] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        
        const respuesta = await nuevaSolicitud.post(
          `/contrataciones/create-payment-intent/${id}`
        );
        setClientSecret(respuesta.data.clientSecret);
        setSolicitudEnviada(true); // actualiza el estado para indicar que se ha enviado una solicitud
      } catch (error) {
        console.log(error);
      }
    };
    // solo envía la solicitud si aún no se ha enviado una
    if (!solicitudEnviada) {
      makeRequest();
    }
  }, [id, solicitudEnviada]);

  const appearance = {
    theme: 'stripe',
  };
  const opciones = {
    clientSecret,
    appearance,
  };

  return <div className="pago">
    {clientSecret && (
        <Elements options={opciones} stripe={stripePromise}>
          <FormularioPago />
        </Elements>
      )}
  </div>;
};

export default Pago;