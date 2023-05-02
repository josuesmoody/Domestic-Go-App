import Contratacion from "../modelos/contratacion.modelo.js";
import Servicio from "../modelos/servicio.modelo.js";
import Stripe from "stripe";

export const intento = async (solicitud, respuesta, siguiente) => {
  const stripe = new Stripe(process.env.STRIPE);

  const servicio = await Servicio.findById(solicitud.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: servicio.precio * 100,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

 const nuevaContratacion = new Contratacion({
    idServicio: servicio._id,
    imagen: servicio.portada,
    titulo: servicio.titulo,
    idCliente: solicitud.idUsuario,
    idOfertante: servicio.idUsuario,
    precio: servicio.precio,
    intento_de_pago: paymentIntent.id,
  });

  await nuevaContratacion.save();

  respuesta.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
};

export const getContrataciones = async (solicitud, respuesta, siguiente) => {
  try {
    const contrataciones = await Contratacion.find({
      ...(solicitud.esOfertante ? { idOfertante: solicitud.idUsuario } : { idCliente: solicitud.idUsuario }),
      completado: true,
    });

    respuesta.status(200).send(contrataciones);
  } catch (error) {
    siguiente(error);
  }
};

{/* CONFIRMAR PAGO */}
export const confirmar = async (solicitud, respuesta, siguiente) => {
  try {
    const contratacion = await Contratacion.findOneAndUpdate(
      {
        intento_de_pago: solicitud.body.intento_de_pago,
        completado: false
      },
      {
        $set: {
          completado: true,
          payment_intent: solicitud.body.intento_de_pago
        }
      },
      { new: true }
    );

    if (!contratacion) {
      respuesta.status(404).send("Contratación no encontrada o ya completada.");
      return;
    }

    respuesta.status(200).send("La contratación fue confirmada!");
  } catch (error) {
    siguiente(error);
  }
};