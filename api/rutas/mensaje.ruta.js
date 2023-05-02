import express from "express";
import { verificarToken } from "../middleware/jwt.js";
import {crearMensaje, getMensajes} from "../controladores/mensaje.controlador.js"

const enrutador = express.Router();

enrutador.post("/", verificarToken, crearMensaje);
enrutador.get("/:id", verificarToken, getMensajes);

export default enrutador;