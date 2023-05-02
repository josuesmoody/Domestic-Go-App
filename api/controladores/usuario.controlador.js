import Usuario from "../modelos/usuario.modelo.js";
import crearError from "../utiles/crearError.js";

{/* ELIMINAR USUARIO */}
export const eliminarUsuario = async (solicitud, respuesta, siguiente) =>{

    const usuario = await Usuario.findById(solicitud.params.id);

        if(solicitud.idUsuario !== usuario._id.toString()){
            return siguiente(crearError(403), "Sólo puedes eliminar tu cuenta!");
            
        }
        await Usuario.findByIdAndDelete(solicitud.params.id);
        respuesta.status(200).send("Eliminado!");
};

{/* OBTENER USUARIO */}
export const getUsuario = async (solicitud, respuesta, siguiente) =>{
    const usuario = await Usuario.findById(solicitud.params.id);

    respuesta.status(200).send(usuario);
};