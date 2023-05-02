import express from "express";
import { verificarToken } from "../middleware/jwt.js";
import {getContrataciones, intento, confirmar} from "../controladores/contratacion.controlador.js"

const enrutador = express.Router();

enrutador.get("/", verificarToken, getContrataciones);
enrutador.post("/create-payment-intent/:id", verificarToken, intento);
enrutador.put("/", verificarToken, confirmar);

export default enrutador;