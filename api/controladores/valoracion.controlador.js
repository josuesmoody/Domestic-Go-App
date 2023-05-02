import Valoracion from "../modelos/valoracion.modelo.js";
import Servicio from "../modelos/servicio.modelo.js";
import crearError from "../utiles/crearError.js";


{/* CREAR UNA RESEÑA */}
export const crearValoracion = async (solicitud, respuesta, siguiente) =>{

    if(solicitud.esOfertante){
        return siguiente(crearError(403, "Los ofertantes no pueden crear reseñas!"));
    }

    const nuevaValoracion = new Valoracion({
        idUsuario: solicitud.idUsuario,
        idServicio: solicitud.body.idServicio,
        descripcion: solicitud.body.descripcion,
        estrella: solicitud.body.estrella,
    });

    try{
        {/* Verificamos si el usuario ya ha hecho una valoración antes */}
        const valoracion = await Valoracion.findOne({
            idServicio: solicitud.body.idServicio,
            idUsuario: solicitud.idUsuario,
        });

        if(valoracion){
            return siguiente(crearError(403, "Ya creaste anteriormente una reseña para este servicio!"));
        }

        const guardarValoracion = await nuevaValoracion.save();

        {/* Incrementamos el número de estrellas al servicio */}
        await Servicio.findByIdAndUpdate(solicitud.body.idServicio, {
            $inc: {estrellasTotales: solicitud.body.estrella, numeroEstrella: 1},
        });

        respuesta.status(201).send(guardarValoracion);

    }catch(error){
        siguiente(error);
    }
}

{/* VER RESEÑA */}
export const getValoracion = async (solicitud, respuesta, siguiente) =>{

    try{
        const valoraciones = await Valoracion.find({idServicio: solicitud.params.idServicio});
        respuesta.status(200).send(valoraciones);

    }catch(error){
        siguiente(error);
    }
    
}

{/* ELIMINAR RESEÑA */}
export const eliminarValoracion = async (solicitud, respuesta, siguiente) =>{

    try{

    }catch(error){
        siguiente(error);
    }
}