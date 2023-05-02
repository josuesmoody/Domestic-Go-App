import express from "express";
import { verificarToken } from "../middleware/jwt.js";
import {crearValoracion, getValoracion, eliminarValoracion} from "../controladores/valoracion.controlador.js"

const enrutador = express.Router();

enrutador.post("/", verificarToken, crearValoracion);
enrutador.get("/:idServicio", getValoracion);
enrutador.delete("/:id", eliminarValoracion);

export default enrutador;