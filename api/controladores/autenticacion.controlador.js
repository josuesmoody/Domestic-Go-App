import Usuario from "../modelos/usuario.modelo.js";
import bcrypt from "bcrypt"; {/*bcrypt me encripta las contraseñas en la BD */}
import jwt from "jsonwebtoken";
import crearError from "../utiles/crearError.js";

{/*FUNCIONES PARA LA AUTENTICACIÓN DE USUARIOS > RUTA */}

{/* REGISTRARSE */}
export const registrar = async (solicitud, respuesta, siguiente) =>{

    try{
        const encriptar = bcrypt.hashSync(solicitud.body.clave, 5);
        const nuevoUsuario = new Usuario({
            ...solicitud.body,
            clave: encriptar,
        });

        await nuevoUsuario.save();
        respuesta.status(201).send("Usuario creado con éxito ;)");

    }catch(error){
        siguiente(error);
    }
}

{/* INICIAR SESIÓN */}
export const iniciarSesion = async (solicitud, respuesta, siguiente) =>{
    try{

        const usuario = await Usuario.findOne({nombreUsuario: solicitud.body.nombreUsuario});

        if(!usuario){
            return siguiente(crearError(404, "Usuario NO encontrado :("));
        }

        const esCorrecto = bcrypt.compareSync(solicitud.body.clave, usuario.clave);

        if(!esCorrecto){
            return siguiente(crearError(400, "Usuario o contraseña incorrectos :("));
        }

        const token = jwt.sign({
            id: usuario._id, 
            esOfertante: usuario.esOfertante,
        }, 
        process.env.LLAVE_JWT
        );

        const {clave, ...informacion} = usuario._doc;
        respuesta.cookie("tokenDeAcceso", token, {httpOnly: true}).status(200).send(informacion);

    }catch(error){
        siguiente(error);
    }
}

{/* CERRAR SESIÓN */}
export const cerrarSesion = async (solicitud, respuesta) =>{

    respuesta.clearCookie("tokenDeAcceso", {sameSite: "none", secure: true,}).status(200).send("El usuario cerró la sesión.");
}
