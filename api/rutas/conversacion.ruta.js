import express from "express";
import { verificarToken } from "../middleware/jwt.js";
import { crearConversacion, getConversaciones, getConversacion, actualizarConversacion} from "../controladores/conversacion.controlador.js"
const enrutador = express.Router();

enrutador.get("/", verificarToken, getConversaciones);
enrutador.get("/single/:id", verificarToken, getConversacion);
enrutador.post("/", verificarToken, crearConversacion);
enrutador.put("/:id", verificarToken, actualizarConversacion);

export default enrutador;