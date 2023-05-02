import express from "express";
import { verificarToken } from "../middleware/jwt.js";

import {crearServicio, eliminarServicio, getServicio, getServicios} from "../controladores/servicio.controlador.js"

const enrutador = express.Router();

enrutador.post("/", verificarToken, crearServicio);
enrutador.delete("/:id", verificarToken, eliminarServicio);
enrutador.get("/single/:id", getServicio);
enrutador.get("/", getServicios);

export default enrutador;