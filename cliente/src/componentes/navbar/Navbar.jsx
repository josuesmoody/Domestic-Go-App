import React, { useEffect, useState } from 'react';
import {Link, useLocation, useNavigate, useOutletContext} from "react-router-dom";
import "./Navbar.scss";
import nuevaSolicitud from '../../utiles/nuevaSolicitud';
import getUsuarioActual from '../../utiles/getUsuarioActual';

const Navbar = () => {

    const [activo, setActivo] = useState(false);
    const [abierto, setAbierto] = useState(false);

    //ruta
    const {pathname} = useLocation()

    function estaActivo() {
        window.scrollY > 0 ? setActivo(true) : setActivo(false);
    }

    useEffect(() =>{
        window.addEventListener("scroll", estaActivo);

        return()=>{
            window.removeEventListener("scroll", estaActivo);
        }
    }, []);

    const usuarioActual = getUsuarioActual();

    const navegar = useNavigate();

    const manejarSalida = async () => {
        try{
            await nuevaSolicitud.post("/autenticacion/cerrarSesion");
            localStorage.setItem("usuarioActual", null);
            navegar("/");
        }catch(error){

        }
    }

    return(
        <div className={activo || pathname !=="/" ? "navbar activo" : "navbar"}>
            <div className="contenedor">
                <div className="logo">
                    <Link to="/" className='enlace'>
                    <img src="../../publico/imagenes/logo.png" alt="Domestic Go" id='imagen-logo'/>
                    </Link>
                    
                </div>
                {/* MENÚ DE USUARIO */}
                <div className="enlaces">
                <Link className="enlace" to="/">
                    <span>Inicio</span>
                </Link>
                    <span>Equipo</span>
                    <span>Explorar</span>
                    {!usuarioActual?.esOfertante && <span>Ofrecer servicios</span>}
          {usuarioActual ? (
            <div className="usuario" onClick={() => setAbierto(!abierto)}>
              <img src={usuarioActual.imagen || "../../publico/imagenes/sin-foto.png"} alt="" />
              <span>{usuarioActual?.nombreUsuario}</span>
              {abierto && (
                <div className="opciones">
                  {usuarioActual.esOfertante && (
                    <>
                      <Link className="enlace" to="/misServicios">
                        Mis Servicios
                      </Link>
                      <Link className="enlace" to="/agregar">
                        Nuevo servicio
                      </Link>
                    </>
                  )}
                  <Link className="enlace" to="/contrataciones">
                    Contrataciones
                  </Link>
                  <Link className="enlace" to="/mensajes">
                    Mensajes
                  </Link>
                  <Link className="enlace" onClick={manejarSalida}>
                    Cerrar sesión
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/iniciarSesion" className="enlace">Iniciar sesión</Link>
              <Link className="enlace" to="/registrar">
                <button>Registrarse</button>
              </Link>
            </>
          )}
                </div>
            </div>
            
            {(activo || pathname !=="/") && (
                <>
                <hr />
                {/* MENÚ DESPLEGADO
                <div className="menu">
                    <Link className='enlace enlaceMenu' to="/servicios/?categoria=limpieza">Limpieza</Link>
                    <Link className='enlace' to="/servicios/?categoria=reparaciones">Reparaciones</Link>
                    <Link className='enlace' to="/servicios/?categoria=mudanzas">Mudanzas</Link>
                    <Link className='enlace' to="/servicios/?categoria=jardineria">Jardinería</Link>
                    <Link className='enlace' to="/servicios/?categoria=cuidado_de_mayores">Cuidado de mayores</Link>
                    <Link className='enlace' to="/servicios/?categoria=mascotas">Mascotas</Link>
                </div>*/}
            </>
            )}
        </div>
    );
};

export default Navbar;