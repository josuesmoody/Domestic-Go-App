import React from 'react';
import "./Mensajes.scss";
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import nuevaSolicitud from '../../utiles/nuevaSolicitud';
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

const Mensajes = () => {

    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

    const consultaCliente = useQueryClient();

    const { isLoading, error, data } = useQuery({
        queryKey: ["conversaciones"],
        queryFn: () =>
          nuevaSolicitud.get(
              `/conversaciones`
            ).then((respuesta) => {
              return respuesta.data;
            }),
      });

      const mutacion = useMutation({
        mutationFn: (id) => {
          return nuevaSolicitud.put(`/conversaciones/${id}`);
        },
        onSuccess: () => {
          consultaCliente.invalidateQueries(["conversaciones"]);
        },
      });
    
      const manejarLectura = (id) => {
        mutacion.mutate(id);
      };

    return(
        <div className='mensajes'>
            {isLoading ? ("cargando...") : error ? ("Algo salió mal :(") : (
            <div className="contenedor">
                <div className="titulo">
                    <h1>Mensajes</h1>
                </div>
                <table>
                    <tbody>
                    <tr className='clasificados'>
                        <th>{usuarioActual.esOfertante ? "Cliente" : "Ofertante"}</th>
                        <th>Último mensaje</th>
                        <th>Fecha</th>
                        <th>Acción</th>
                    </tr>
                    {data.map((conversacion) => (
              <tr
                className={
                  ((usuarioActual.esOfertante && !conversacion.lecturaOfertante) ||
                    (!usuarioActual.esOfertante && !conversacion.lecturaCliente)) ?
                  "activo" : "inactivo"
                }
                key={conversacion.id}
              >
                <td>{usuarioActual.esOfertante ? conversacion.idCliente : conversacion.idOfertante}</td>
                <td>
                  <Link to={`/mensaje/${conversacion.id}`} className="enlace">
                    {conversacion?.ultimoMensaje?.substring(0, 100)}...
                  </Link>
                </td>
                <td>{moment(conversacion.updatedAt).fromNow()}</td>

                {/* MARCAR LA LECTURA DE UN MENSAJE */}
                <td>
                  {((usuarioActual.esOfertante && !conversacion.lecturaOfertante) ||
                    (!usuarioActual.esOfertante && !conversacion.lecturaCliente)) && (
                    <button onClick={() => manejarLectura(conversacion.id)}>
                      Marcar como leído
                    </button>
                  )}
                </td>
              </tr>
            ))} 
            </tbody>
                </table>
            </div>
            )}
        </div>
    );
};

export default Mensajes;