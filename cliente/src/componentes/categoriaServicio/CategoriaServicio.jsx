import React from 'react';
import "./CategoriaServicio.scss";
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import nuevaSolicitud from '../../utiles/nuevaSolicitud';

const CategoriaServicio = ({elemento}) =>{

    const {isLoading, error, data} = useQuery({
        queryKey: [elemento.idUsuario],
        queryFn: () =>
        nuevaSolicitud.get(`/usuarios/${elemento.idUsuario}`).then((respuesta)=>{
            return respuesta.data;
        }),
    });

    return(
        <Link to={`/servicio/${elemento._id}`} className='enlace'>
        <div className="categoriaServicio">
            <img src={elemento.portada} alt="Imagen" />
            <div className="informacion">
                {isLoading ? ("cargando...") : error ? ("Algo salió mal :(") : 
                    (<div className="usuario">
                    <img src={data.imagen || "../../publico/imagenes/sin-foto.png"} alt="Foto de perfil" />
                    <span>{data.nombreUsuario}</span>
                </div>)}

                <p>{elemento.descripcion}</p>
                <div className="estrella">
                    <img src="../../publico/imagenes/estrella.png" alt="Estrellas" />
                    <span>
                    {!isNaN(elemento.estrellasTotales / elemento.numeroEstrella) &&
                    Math.round(elemento.estrellasTotales / elemento.numeroEstrella)}    
                    </span>
                </div>
            </div>
            <hr />
            <div className="detalles">
                <img src="../../publico/imagenes/me-gusta-vacio.png" alt="Me gusta" />
                <div className="precio">
                <span>Precio</span>
                <h2>{elemento.precio}€ / hora</h2>
                </div>
            </div>
        </div>
        </Link>
    );
};

export default CategoriaServicio;