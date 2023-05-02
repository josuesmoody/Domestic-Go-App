import React from 'react'
import "./Footer.scss";
import { Link } from 'react-router-dom';

const Footer = () => {
    return(
        <div className='footer'>
            <div className="contenedor">
                {/* ENLACES */}
                <div className="arriba">
                    <div className="elemento">
                        <h2>Servicios</h2>
                        <Link className="enlace" to="/servicios/?categoria=limpieza">
                        <span>Limpieza del hogar</span>
                        </Link>
                        <Link className="enlace" to="/servicios/?categoria=cuidado_de_mayores">
                        <span>Cuidado de mayores</span>
                        </Link>
                        <Link className="enlace" to="/servicios/?categoria=reparaciones">
                        <span>Reparaciones</span>
                        </Link>
                        <Link className="enlace" to="/servicios/?categoria=mudanzas">
                        <span>Mudanzas</span>
                        </Link>
                        <Link className="enlace" to="/servicios/?categoria=mascotas">
                        <span>Paseo y cuidado de mascotas</span>
                        </Link>
                    </div>
                    <div className="elemento">
                        <h2>Sitio web</h2>
                        <Link className="enlace" to="/">
                        <span>Inicio</span>
                        </Link>
                        <Link className="enlace" to="#">
                        <span>Equipo</span>
                        </Link>
                        <Link className="enlace" to="#">
                        <span>Explorar</span>
                        </Link>
                        <Link className="enlace" to="/registrar">
                        <span>Registrarse</span>
                        </Link>
                        <Link className="enlace" to="/iniciarSesion">
                        <span>Iniciar sesión</span>
                        </Link>
                    </div>
                    <div className="elemento">
                        <h2>Legal</h2>
                        <Link className="enlace" to="#">
                        <span>Políticas de privacidad</span>
                        </Link>
                        <Link className="enlace" to="#">
                        <span>Términos & Condiciones</span>
                        </Link>
                        <Link className="enlace" to="#">
                        <span>Políticas de cookies</span>
                        </Link>
                        <Link className="enlace" to="#">
                        <span>Servicio al cliente</span>
                        </Link>
                        <Link className="enlace" to="#">
                        <span>Preguntas frecuentes</span>
                        </Link>
                    </div>
                </div>
                <hr />
                {/* DERECHOS DE AUTOR */}
                <div className="abajo">
                    <div className="izquierda">
                    <img src="../../publico/imagenes/logo.png" alt="Domestic Go" id='imagen-logo'/><br></br>
                        <span>© Domestic Go. 2023</span><br></br>
                        <span>Desarrollado por<a href='https://www.linkedin.com/in/josu%C3%A9-santana-moody/' target='blank_'> Josué Santana</a></span>
                        
                    </div>
                    <div className="derecha">
                        <div className="redes">
                            <a href="#" target='blank_'><img src="../../publico/imagenes/twitter.png" alt="Twitter" /></a>
                            <a href="#" target='blank_'><img src="../../publico/imagenes/facebook.png" alt="Facebook" /></a>
                            <a href="https://www.linkedin.com/company/domestic-go/" target='blank_'><img src="../../publico/imagenes/linkedin.png" alt="LinkedIn" /></a>
                            <a href="https://www.instagram.com/domesticgo.es/" target='blank_'><img src="../../publico/imagenes/instagram.png" alt="Instagram" /></a>
                            <a href="#" target="blank_"><img src="../../publico/imagenes/tiktok.png" alt="TikTok" /></a>
                        </div>
                        <div className="enlace">
                            <img src="../../publico/imagenes/idioma.png" alt="Idioma" />
                            <span>Español</span>
                        </div>
                        <div className="enlace">
                            <img src="../../publico/imagenes/moneda.png" alt="Moneda" />
                            <span>Euro</span>
                        </div>
                        <img src="../../publico/imagenes/accesibilidad.png" alt="Accesibilidad" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;