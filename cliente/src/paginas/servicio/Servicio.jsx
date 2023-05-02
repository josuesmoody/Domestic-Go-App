import React from 'react';
import "./Servicio.scss";
import {Slider} from "infinite-react-carousel/lib";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import nuevaSolicitud from '../../utiles/nuevaSolicitud';
import Valoraciones from '../../componentes/valoraciones/Valoraciones';
import moment from 'moment';
import 'moment/locale/es';
import getUsuarioActual from '../../utiles/getUsuarioActual';

function Servicio() {

  const {id} = useParams();

  const usuarioActual = getUsuarioActual();

    const navegar = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["servicio"],
    queryFn: () =>
      nuevaSolicitud.get(
          `/servicios/single/${id}`).then((respuesta) => {
          return respuesta.data;
        }),
  });

  const idUsuario = data?.idUsuario;

  const { isLoading: cargandoUsuario, error: errorUsuario, data: datosUsuario } = useQuery({
    queryKey: ["usuario"],
    queryFn: () =>
      nuevaSolicitud.get(
          `/usuarios/${idUsuario}`).then((respuesta) => {
          return respuesta.data;
        }), enabled: !!idUsuario,
  });
  
    return (
      <div className="servicio">
        {isLoading ? ("cargando...") : error ? ("Algo salió mal :(") : 
        <div className="contenedor">
          <div className="izquierda">
            <span className="migas-de-pan"><Link to={`/servicios/?categoria=${data.categoria}`}>SERVICIOS</Link> / {data.titulo}</span>
            {/* SERVICIO */}
            <h1>{data.titulo}</h1>

            {/* SECCIÓN USUARIO */}
            {cargandoUsuario ? ("cargando...") : errorUsuario ? ("Algo salió mal :(") : (
            <div className="usuario">
              <img
                className="foto-de-perfil"
                src={datosUsuario.imagen || "../../publico/imagenes/sin-foto.png"}
                alt=""
              />
              <span>{datosUsuario.nombreUsuario}</span>
              {!isNaN(data.estrellasTotales / data.numeroEstrella) && (
                <div className="estrellas">
                  {Array(Math.round(data.estrellasTotales / data.numeroEstrella))
                      .fill()
                      .map((elemento, i) => (
                        <img src="../../publico/imagenes/estrella.png" alt="" key={i} />
                      ))}
                <span>{Math.round(data.estrellasTotales / data.numeroEstrella)}</span>
              </div>
            )}
            </div>)}

            <Slider slidesToShow={1} arrowsScroll={1} className="carrusel-imagenes">
              
              {data.imagenes.map((imagen) =>(
                  <img
                  key={imagen}
                  src={imagen}
                  alt=""
                />
              ))}
            </Slider>
            <h2>Detalles del servicio</h2>
            <p>
              {data.descripcion}
            </p>

            {/* SECCIÓN OFERTANTE */}
            {cargandoUsuario ? ("cargando...") : errorUsuario ? ("Algo salió mal :(") : (
            <div className="ofertante">
              <h2>Datos del ofertante</h2>
              <div className="usuario">
                <img
                  src={datosUsuario.imagen || "../../publico/imagenes/sin-foto.png"}
                  alt=""
                />
                {/* DATOS DEL OFERTANTE */}
                <div className="informacion">
                  <span>{datosUsuario.nombreUsuario}</span>
                  {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="estrellas">
                        {Array(Math.round(data.estrellasTotales / data.numeroEstrella))
                          .fill()
                          .map((elemento, i) => (
                            <img src="../../publico/imagenes/estrella.png" alt="" key={i} />
                          ))}
                    <span>{Math.round(data.estrellasTotales / data.numeroEstrella)}</span>
                </div>
                )}
                  <button >Contactar</button>
                  
                  </div>
              </div>
              <div className="caja">
                <div className="elementos">
                  <div className="elemento">
                    <span className="titulo">País</span>
                    <span className="descripcion">{datosUsuario.pais}</span>
                  </div>
                  <div className="elemento">
                    <span className="titulo">Miembro desde</span>
                    <span className="descripcion">{moment(datosUsuario.createdAt).locale('es').format('LL')}</span>
                  </div>
                  <div className="elemento">
                    <span className="titulo">Tiempo medio de respuesta</span>
                    <span className="descripcion">3 horas</span>
                  </div>
                  <div className="elemento">
                    <span className="titulo">último servicio realizado</span>
                    <span className="descripcion">2 días</span>
                  </div>
                  <div className="elemento">
                    <span className="titulo">Idioma</span>
                    <span className="descripcion">Español</span>
                  </div>
                </div>
                <hr />
                <p>{datosUsuario.descripcion}</p>
              </div>
            </div>)}
            {/* RESEÑAS */}
            <Valoraciones idServicio={id}/>
          </div>
          {/* CONTRATACIÓN DEL SERVICIO */}
          <div className="derecha">
            <div className="precio">
              <h3>{data.tituloCorto}</h3>
              <h2>{data.precio} € / hora</h2>
            </div>
            <p>
              {data.descripcionCorta}
            </p>
            <div className="detalles">
              
              <div className="elemento">
                <img src="" alt="" />
                <span>Servicios realizados: {data.serviciosRealizados}</span>
              </div>
            </div>
            <div className="caracteristicas">

              {data.caracteristicas.map((caracteristica) =>(
                <div className="elemento" key={caracteristica}>
                <img src="" alt="" />
                <span>{caracteristica}</span>
              </div>
                ))}
            </div>
            <Link to={`/pago/${id}`}>
              <button>Contratar</button>
            </Link>
          </div>
        </div>}
      </div>
    );
  }
  
  export default Servicio;