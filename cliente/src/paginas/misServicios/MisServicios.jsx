import React from "react";
import { Link } from "react-router-dom";
import "./MisServicios.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getUsuarioActual from "../../utiles/getUsuarioActual";
import nuevaSolicitud from "../../utiles/nuevaSolicitud";

function MisServicios() {
  const usuarioActual = getUsuarioActual();

  const consultaCliente = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["misServicios"],
    queryFn: () =>
      nuevaSolicitud.get(`/servicios?idUsuario=${usuarioActual.id}`).then((respuesta) => {
        return respuesta.data;
      }),
  });

  const mutacion = useMutation({
    mutationFn: (id) => {
      return nuevaSolicitud.delete(`/servicios/${id}`);
    },
    onSuccess: () => {
      consultaCliente.invalidateQueries(["misServicios"]);
    },
  });

  const manejarBorrado = (id) => {
    mutacion.mutate(id);
  };

  return (
    <div className="misServicios">
      {isLoading ? (
        "cargando..."
      ) : error ? (
        "error"
      ) : (
        <div className="contenedor">
          <div className="titulo">
            <h1>Mis servicios</h1>
            {usuarioActual.esOfertante && (
              <Link to="/agregar">
                <button>Nuevo servicio</button>
              </Link>
            )}
          </div>
          <table>
          <tbody>
            <tr className='clasificados'>
              <th>Imagen</th>
              <th>Título</th>
              <th>Precio</th>
              <th>Servicios realizados</th>
              <th>Acción</th>
            </tr>
            {data.map((servicio) => (
              <tr key={servicio._id}>
                <td>
                  <img className="imagen" src={servicio.portada} alt="" />
                </td>
                <td>{servicio.titulo}</td>
                <td>{servicio.precio}</td>
                <td>{servicio.serviciosRealizados}</td>
                <td>
                  <img
                    className="borrar"
                    src="../../publico/imagenes/borrar.png"
                    alt=""
                    onClick={() => manejarBorrado(servicio._id)}
                  />
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MisServicios;