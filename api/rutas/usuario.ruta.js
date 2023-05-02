import express from "express";
import {eliminarUsuario, getUsuario} from "../controladores/usuario.controlador.js";
import {verificarToken} from "../middleware/jwt.js"

const enrutador = express.Router();

enrutador.delete("/:id", verificarToken, eliminarUsuario);
enrutador.get("/:id", verificarToken, getUsuario);

export default enrutador;