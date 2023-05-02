import React from 'react';
import "./Contrataciones.scss";
import { useQuery } from '@tanstack/react-query';
import nuevaSolicitud from '../../utiles/nuevaSolicitud';
import { useNavigate } from 'react-router-dom';
import getUsuarioActual from '../../utiles/getUsuarioActual';

const Contrataciones = () => {

    const usuarioActual = getUsuarioActual();

    const navegar = useNavigate();

    const { isLoading, error, data } = useQuery({
        queryKey: ["contrataciones"],
        queryFn: () =>
          nuevaSolicitud.get(`/contrataciones`).then((respuesta) => {
              return respuesta.data;
            }),
        cacheTime: 0,
      });

      const manejarContactar = async (contratacion) =>{
        const idOfertante = contratacion.idOfertante;
        const idCliente = contratacion.idCliente;
        const id = idOfertante + idCliente;

        try{
            const respuesta = await nuevaSolicitud.get(`/conversaciones/single/${id}`);
            navegar(`/mensaje/${respuesta.data.id}`);
        }catch(error){
            if(error.response.status === 404){
                const respuesta = await nuevaSolicitud.post(`/conversaciones/`, {to: usuarioActual.esOfertante ? idCliente : idOfertante,});

                navegar(`/mensaje/${respuesta.data.id}`);
            }
        }
      };

    return(
        <div className='contrataciones'>
            {isLoading ? ("cargando...") : error ? ("Algo salió mal :(") : (
            <div className="contenedor">
                <div className="titulo">
                    <h1>Mis contrataciones</h1>
                </div>
                <table>
                <tbody>
                    <tr className='clasificados'>
                        <th>Imagen</th>
                        <th>Título</th>
                        <th>Precio</th>
                        <th>Contactar</th>
                    </tr>
                    {data.map((contratacion) =>(
                        <tr key={contratacion._id}>
                        <td>
                            <img src={contratacion.imagen} alt="" className='imagen'/>
                        </td>
                        <td>{contratacion.titulo}</td>
                        <td>{contratacion.precio}€ / hora</td>
                        <td>
                            <img src="../../publico/imagenes/chat.png" alt="" className='mensaje' onClick={()=>manejarContactar(contratacion)}/>
                        </td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>)}
        </div>
    );
};

export default Contrataciones;