import Servicio from "../modelos/servicio.modelo.js";
import crearError from "../utiles/crearError.js";

{/* NUEVO SERVICIO */}
export const crearServicio = async (solicitud, respuesta, siguiente) =>{
    if(!solicitud.esOfertante){
        return siguiente(crearError(403, "Ups, sólo los ofertantes pueden crear servicios!"));

    }

        const nuevoServicio = new Servicio({
            idUsuario: solicitud.idUsuario,
            ...solicitud.body,
        });

        try{
            const guardarServicio = await nuevoServicio.save();
            respuesta.status(201).json(guardarServicio);
        }catch(error){
            siguiente(error);
        }
}

{/* ELIMINAR SERVICIO EXISTENTE */}
export const eliminarServicio = async (solicitud, respuesta, siguiente) =>{
    try{
        const servicio = await Servicio.findById(solicitud.params.id);

        if(servicio.idUsuario !== solicitud.idUsuario){
            return siguiente(crearError(403, "Sólo puedes eliminar tu servicio!"));
        }

        await Servicio.findByIdAndDelete(solicitud.params.id);
        respuesta.status(200).send("El servicio fue eliminado!");

    }catch(error){
        siguiente(error);
    }
}

{/* FILTRAR Y OBTENER SERVICIO */}
export const getServicio = async (solicitud, respuesta, siguiente) =>{
    try{
        const servicio = await Servicio.findById(solicitud.params.id);

        if(!servicio){
            siguiente(crearError(404, "Servicio no encontrado!"));
        }
        respuesta.status(200).send(servicio);
    }catch(error){
        siguiente(error);
    }
};

{/* OBTENER TODOS LOS SERVICIOS */}
export const getServicios = async (solicitud, respuesta, siguiente) =>{

    {/* FILTROS DE BÚSQUEDA -> (por usuario, categoría, precio y título)*/}
    const consulta = solicitud.query;
    const filtros ={
        ...(consulta.idUsuario && {idUsuario: consulta.idUsuario}),
        ...(consulta.categoria && {categoria: consulta.categoria}),
        ...((consulta.minimo || consulta.maximo) && {precio: {...(consulta.minimo && {$gt: consulta.minimo}), ...(consulta.maximo && {$lt: consulta.maximo})}, }),
        ...(consulta.busqueda && {titulo:{$regex: consulta.busqueda, $opciones: "i"}}),
    }

    try {
        const servicios = await Servicio.find(filtros).sort({ [consulta.ordenar]: -1 }); //sort
        respuesta.status(200).send(servicios);
      } catch (error) {
        siguiente(error);
      }

};