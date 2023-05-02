import jwt from "jsonwebtoken";
import crearError from "../utiles/crearError.js";

export const verificarToken = (solicitud, respuesta, siguiente)=>{
    const token = solicitud.cookies.tokenDeAcceso; //tokenDeAcceso

    if(!token){
        
        return siguiente(crearError(401, "Aún no has iniciado sesión!"));
    }

    jwt.verify(token, process.env.LLAVE_JWT, async (error, carga) =>{
        if(error){
        
            return siguiente(crearError(403, "Token NO válido :("));
        }
        solicitud.idUsuario = carga.id;
        solicitud.esOfertante = carga.esOfertante;
        siguiente();
    });
};