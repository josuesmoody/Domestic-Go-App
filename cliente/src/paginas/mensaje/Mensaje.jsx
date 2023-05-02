import React from 'react';
import "./Mensaje.scss";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import nuevaSolicitud from '../../utiles/nuevaSolicitud';
import getUsuarioActual from '../../utiles/getUsuarioActual';

const Mensaje = () => {

    const {id} = useParams();

    const usuarioActual = getUsuarioActual();

    const consultaCliente = useQueryClient();

    const { isLoading, error, data } = useQuery({
        queryKey: ["mensajes"],
        queryFn: () =>
          nuevaSolicitud.get(
              `/mensajes/${id}`
            ).then((respuesta) => {
              return respuesta.data;
            }),
      });

      const mutacion = useMutation({
        mutationFn: (mensaje) => {
          return nuevaSolicitud.post(`/mensajes`, mensaje);
        },
        onSuccess: () => {
          consultaCliente.invalidateQueries(["mensajes"]);
        },
      });
    
      const manejarEnvio = (evento) => {
        evento.preventDefault();
        mutacion.mutate({
            idConversacion: id,
            descripcion: evento.target[0].value,
        });
        evento.target[0].value="";
      };

    return(
        <div className='mensaje'>
            <div className="contenedor">
                <span className="migas-de-pan">
                    <Link to="/mensajes">MENSAJES</Link> / {usuarioActual.nombreUsuario}
                </span>
                {isLoading ? ("cargando...") : error ? ("Algo salió mal :(") : (
                <div className="mensajes">
                    
                    {/* MENSAJES */}
                    <br /><br />
                    {data.map((mensaje)=>(
                        <div className={mensaje.idUsuario === usuarioActual?._id ? "elemento propio" : "elemento"} key={mensaje._id}>
                        <img src={mensaje.idUsuario === usuarioActual?._id ? usuarioActual?.imagen || "../../publico/imagenes/sin-foto.png" : "../../publico/imagenes/sin-foto.png"} alt="" />
                        <p>{mensaje.descripcion}</p>
                      </div>
                    ))}
                </div>)}
                <hr />
                <form className="escribir" onSubmit={manejarEnvio}>
                    <textarea name="" id="" cols="30" rows="10" placeholder='Escribe un mensaje aquí...'></textarea>
                    <button type='submit'>Enviar</button>
                </form>
            </div>
        </div>
    );
};

export default Mensaje;
