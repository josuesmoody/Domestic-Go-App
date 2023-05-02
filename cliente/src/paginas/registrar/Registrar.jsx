import React, { useRef, useState } from "react";
import subirArchivo from "../../utiles/subirArchivo";
import "./Registrar.scss";
import nuevaSolicitud from "../../utiles/nuevaSolicitud";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';

function Registrar() {
  const [fichero, setFichero] = useState(null);
  const [usuario, setUsuario] = useState({
    nombreUsuario: "",
    correo: "",
    clave: "",
    imagen: "",
    pais: "",
    esOfertante: false,
    descripcion: "",
  });

  const formulario = useRef();

  const navegar = useNavigate();

  {/* MANEJO DE CAMBIOS Y EVENTOS */}

  const manejarCambio = (evento) => {
    setUsuario((anterior) => {
      return { ...anterior, [evento.target.name]: evento.target.value };
    });
  };

  {/* COMPROBACIÓN DE ALTA OFERTANTES */}

  const manejarOfertante = (evento) => {
    setUsuario((anterior) => {
      return { ...anterior, esOfertante: evento.target.checked };
    });
  };

  {/* MANEJO DE ENVÍOS DE FORMULARIO */}
  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    const url = await subirArchivo(fichero);
    try {
      await nuevaSolicitud.post("/autenticacion/registrar", {...usuario, imagen: url,});
      navegar("/");
      
       {/* ENVIAMOS CORREO DE BIENVENIDA */}
      evento.preventDefault();

      emailjs.sendForm('service_j7eu9lf', 'template_e04mkye', formulario.current, 'nfG_HIoYSDoDXvPUQ')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        evento.target.reset();

        //
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="registrar">
      <form ref={formulario} onSubmit={manejarEnvio}>
        <div className="izquierda">
          <h1>Crear nueva cuenta</h1>
          <label htmlFor="">Nombre de usuario</label>
          <input name="nombreUsuario" type="text" placeholder="johndoe"onChange={manejarCambio}/>
          <label htmlFor="">Correo electrónico</label>
          <input name="correo" type="email" onChange={manejarCambio}/>
          <label htmlFor="">Contraseña</label>
          <input name="clave" type="password" onChange={manejarCambio} />
          <label htmlFor="">Foto de perfil</label>
          <input type="file" onChange={(evento) => setFichero(evento.target.files[0])} />
          <label htmlFor="">País</label>
          <input name="pais" type="text" onChange={manejarCambio}/>
          <button type="submit">Registrarme</button>
        </div>
        <div className="derecha">
          <h1>Quiero ofrecer mis servicios</h1>
          <div className="palanca">
            <label htmlFor="">Activar cuenta de ofertante</label>
            <label className="suiche">
              <input type="checkbox" onChange={manejarOfertante} />
              <span className="deslizable redondo"></span>
            </label>
          </div>
          <label htmlFor="">Teléfono</label>
          <input name="telefono" type="text" placeholder="+34 000 000 000" onChange={manejarCambio}/>
          <label htmlFor="">Descripción</label>
          <textarea
            placeholder="Una pequeña descripción sobre tí..."
            name="descripcion"
            id=""
            cols="30"
            rows="10"
            onChange={manejarCambio}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Registrar;