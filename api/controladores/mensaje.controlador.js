
import Conversacion from "../modelos/conversacion.modelo.js";
import Mensaje from "../modelos/mensaje.modelo.js";

export const crearMensaje = async (solicitud, respuesta, siguiente) =>{

    const nuevoMensaje = new Mensaje({
        idConversacion: solicitud.body.idConversacion,
        idUsuario: solicitud.idUsuario,
        descripcion: solicitud.body.descripcion
    })
    try{

        const guardarMensaje = await nuevoMensaje.save();
        await Conversacion.findOneAndUpdate({id: solicitud.body.idConversacion}, {$set:{
            lecturaOfertante: solicitud.esOfertante,
            lecturaCliente: !solicitud.esOfertante,
            ultimoMensaje: solicitud.body.descripcion,
        },}, {new: true});

        respuesta.status(201).send(guardarMensaje);
        
    }catch(error){
        siguiente(error);
    }
}

export const getMensajes = async (solicitud, respuesta, siguiente) =>{

    const mensajes = await Mensaje.find({idConversacion: solicitud.params.id});
    respuesta.status(200).send(mensajes);
    try{

    }catch(error){
        siguiente(error);
    }
}