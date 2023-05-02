import Conversacion from "../modelos/conversacion.modelo.js";
import crearError from "../utiles/crearError.js";

{/* CREAR NUEVA CONVERSACIÓN */}
export const crearConversacion = async (solicitud, respuesta, siguiente) =>{

    const nuevaConversacion = new Conversacion({
        id: solicitud.esOfertante ? solicitud.idUsuario + solicitud.body.to : solicitud.body.to + solicitud.idUsuario,
        idOfertante: solicitud.esOfertante ? solicitud.idUsuario : solicitud.body.to,
        idCliente: solicitud.esOfertante ? solicitud.body.to : solicitud.idUsuario,
        lecturaOfertante: solicitud.esOfertante,
        lecturaCliente: !solicitud.esOfertante,
    });

    try{
        const guardarConversacion = await nuevaConversacion.save();
        respuesta.status(201).send(guardarConversacion);
       
    }catch(error){
        siguiente(error);
    }
}

{/* OBTENER CONVERSACIÓN CONCRETA */}
export const getConversacion = async (solicitud, respuesta, siguiente) =>{

    try{
       
        const conversacion = await Conversacion.findOne({ id: solicitud.params.id });
        if(!conversacion){
            return siguiente(crearError(404, "Conversación NO encontrada :("));
        }
        respuesta.status(200).send(conversacion);
    }catch(error){
        siguiente(error);
    }
}

{/* OBTENER TODAS LAS CONVERSACIONES */}
export const getConversaciones = async (solicitud, respuesta, siguiente) =>{

     try{
        const conversacion = await Conversacion.find(
            solicitud.esOfertante ? {idOfertante: solicitud.idUsuario} : {idCliente: solicitud.idUsuario}
            ).sort({updatedAt:-1});

            respuesta.status(200).send(conversacion);
  
    }catch(error){
        siguiente(error);
    }
}

{/* ACTUALIZAR CONVERSACIÓN */}
export const actualizarConversacion = async (solicitud, respuesta, siguiente) =>{

    try{
        const actualizarConversacion = await Conversacion.findOneAndUpdate({id: solicitud.params.id}, {
            $set: {
                ...(solicitud.esOfertante ? {lecturaOfertante: true} : {lecturaCliente: true})
            },
        }, {new: true});

        respuesta.status(200).send(actualizarConversacion);
    }catch(error){
        siguiente(error);
    }
}