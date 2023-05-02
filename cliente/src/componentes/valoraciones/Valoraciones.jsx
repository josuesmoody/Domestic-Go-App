import React from "react";
import Valoracion from "../valoracion/Valoracion";
import "./Valoraciones.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import nuevaSolicitud from "../../utiles/nuevaSolicitud";

const Valoraciones = ({idServicio}) =>{

    const consultaCliente =useQueryClient();

    const { isLoading, error, data } = useQuery({
        queryKey: ["valoraciones"],
        queryFn: () =>
          nuevaSolicitud.get(
              `/valoraciones/${idServicio}`).then((respuesta) => {
              return respuesta.data;
            }),
      }); 

      const mutacion = useMutation({
        mutationFn: (valoracion) => {
            return nuevaSolicitud.post("/valoraciones", valoracion);
        },
        onSuccess:()=>{
            consultaCliente.invalidateQueries(["valoraciones"]);
        }
      });

      {/* MANEJAMOS EL ENVÍO DESDE EL FORMULARIO DE RESEÑAS */}
      const manejarEnvio = (evento) =>{
            evento.preventDefault();
            const descripcion = evento.target[0].value;
            const estrella = evento.target[1].value;
            mutacion.mutate({idServicio, descripcion, estrella});
      }

    return (
        <div className="valoraciones">
            <h2>Reseñas</h2>
            {isLoading ? ("cargando...") : error ? ("Algo salió mal :(") : (
                data.map((valoracion) => <Valoracion key={valoracion._id} valoracion={valoracion}/>))}

                {/* AGREGAR RESEÑAS */}
                <div className="agregar">
                    <h3>Añadir reseña</h3>
                    <form action="" className="formularioAgregar" onSubmit={manejarEnvio}>
                        <input type="text" placeholder="Escribe tu opinión..."/>
                        <select name="" id="">
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <button>Enviar</button>
                    </form>
                </div>
        </div>
    );
};

export default Valoraciones;