import React, { useEffect, useRef, useState } from "react";
import "./Servicios.scss";
import CategoriaServicio from "../../componentes/categoriaServicio/CategoriaServicio";
import { useQuery } from "@tanstack/react-query";
import nuevaSolicitud from "../../utiles/nuevaSolicitud.js";
import { useLocation } from "react-router-dom";

function Servicios() {
  const [ordenar, setOrdenar] = useState("contrataciones");
  const [abrir, setAbrir] = useState(false);
  const referenciaMinimo = useRef();
  const referenciaMaximo = useRef();

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["servicios"],
    queryFn: () =>
      nuevaSolicitud.get(
          `/servicios${search}&minimo=${referenciaMinimo.current.value}&maximo=${referenciaMaximo.current.value}&ordenar=${ordenar}`
        ).then((respuesta) => {
          return respuesta.data;
        }),
  });

  console.log(data);

  const reOrdenar = (tipo) => {
    setOrdenar(tipo);
    setAbrir(false);
  };

  useEffect(() => {
    refetch();
  }, [ordenar]);

  const filtrar = () => {
    refetch();
  };

  return (
    <div className="servicios">
      <div className="contenedor">
        <span className="migas-de-pan">Domestic Go / Servicios /</span>
        <h1>Servicios</h1>
        <p>
          Explora todos nuestros servicios
        </p>
        <div className="menu">
          <div className="izquierda">
            <span>Precio</span>
            <input ref={referenciaMinimo} type="number" placeholder="mínimo" />
            <input ref={referenciaMaximo} type="number" placeholder="máximo" />
            <button onClick={filtrar}>Filtrar</button>
          </div>
          <div className="derecha">
            <span className="ordenarPor">Ordenar Por</span>
            <span className="tipoOrden">
              {ordenar === "contrataciones" ? "Mejores ofertantes" : "Nuevos ofertantes"}
            </span>
            <img src="../../publico/imagenes/flecha-abajo.png" alt="" onClick={() => setAbrir(!abrir)} />
            {abrir && (
              <div className="menuDerecha">
                {ordenar === "contrataciones" ? (
                  <span onClick={() => reOrdenar("creadoEn")}>Nuevos ofertantes</span>
                ) : (
                  <span onClick={() => reOrdenar("contrataciones")}>Mejores ofertantes</span>
                )}
                <span onClick={() => reOrdenar("contrataciones")}>Populares</span>
              </div>
            )}
          </div>
        </div>
        <div className="tarjetas">
          {isLoading
            ? "cargando..."
            : error
            ? "Algo salió mal :("
            : data.map((servicio) => <CategoriaServicio key={servicio._id} elemento={servicio} />)}
        </div>
      </div>
    </div>
  );
}

export default Servicios;