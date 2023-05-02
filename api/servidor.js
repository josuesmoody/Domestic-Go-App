import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import rutaUsuario from "./rutas/usuario.ruta.js";
import rutaValoracion from "./rutas/valoracion.ruta.js";
import rutaServicio from "./rutas/servicio.ruta.js";
import rutaMensaje from "./rutas/mensaje.ruta.js";
import rutaConversacion from "./rutas/conversacion.ruta.js";
import rutaContratacion from "./rutas/contratacion.ruta.js";
import rutaAutenticacion from "./rutas/autenticacion.ruta.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
mongoose.set('strictQuery', true);

const conectar = async ()=>{

    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Conectado a MongoDB!");
    } catch(error){
        console.log(error);
    }
};

{/* CONFIGURACIÓN */}

app.use(cors({origin:"http://localhost:5173", credentials: true}));
app.use(express.json());
app.use(cookieParser());

{/* RUTAS */}

app.use("/api/usuarios", rutaUsuario);
app.use("/api/autenticacion", rutaAutenticacion);
app.use("/api/valoraciones", rutaValoracion);
app.use("/api/servicios", rutaServicio);
app.use("/api/mensajes", rutaMensaje);
app.use("/api/conversaciones", rutaConversacion);
app.use("/api/contrataciones", rutaContratacion);

app.use((error, solicitud, respuesta, siguiente)=>{
    const estadoDeError = error.status || 500;
    const mensajeDeError = error.message || "Algo salió mal :(";
    
    return respuesta.status(estadoDeError).send(mensajeDeError);
});

app.listen(8800, ()=>{
    conectar();
    console.log("Servidor backend corriendo!");

});