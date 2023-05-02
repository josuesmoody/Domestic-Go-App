import express from "express";
import {registrar, iniciarSesion, cerrarSesion} from "../controladores/autenticacion.controlador.js";

const enrutador = express.Router();

enrutador.post("/registrar", registrar);
enrutador.post("/iniciarSesion", iniciarSesion);
enrutador.post("/cerrarSesion", cerrarSesion);

export default enrutador;