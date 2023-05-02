import React from "react";
import "./Valoracion.scss"
import { useQuery } from "@tanstack/react-query";
import nuevaSolicitud from "../../utiles/nuevaSolicitud";

const Valoracion = ({valoracion}) =>{

    const { isLoading, error, data } = useQuery({
        queryKey: [valoracion.idUsuario],
        queryFn: () =>
          nuevaSolicitud.get(
              `/usuarios/${valoracion.idUsuario}`).then((respuesta) => {
              return respuesta.data;
            }),
      }); 

    return(
        <div className="valoracion">
              <div className="elemento">
                {isLoading ? ("cargando...") : error ? ("Algo salió mal :(") : (
                <div className="usuario">
                  <img
                    className="foto-de-perfil"
                    src={data.imagen || "../../publico/imagenes/sin-foto.png"}
                    alt=""
                  />
                  <div className="informacion">
                    <span>{data.nombreUsuario}</span>
                    <div className="pais">
                      <span>{data.pais}</span>
                    </div>
                  </div>
                </div>)}
                <div className="estrellas">
                    {Array(valoracion.estrella).fill().map((item, i) =>(
                             <img src="../../publico/imagenes/estrella.png" alt="" key={i}/>
                        ))}
                  <span>{valoracion.estrella}</span>
                </div>
                <p>{valoracion.descripcion}</p>
                <div className="util">
                  <span>Fue de ayuda?</span>
                  <img src="../../publico/imagenes/gusta.png" alt="" />
                  <span>Si</span>
                  <img src="../../publico/imagenes/no-gusta.png" alt="" />
                  <span>No</span>
                </div>
              </div>
              <hr />
            </div>
    );
};

export default Valoracion;