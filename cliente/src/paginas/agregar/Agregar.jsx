import React, { useReducer, useState } from "react";
import "./Agregar.scss";
import {servicioReductor, ESTADO_INICIAL} from "../../reductores/servicioReductor.js";
import subirArchivo from "../../utiles/subirArchivo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import nuevaSolicitud from "../../utiles/nuevaSolicitud";
import { useNavigate } from "react-router-dom";

const Agregar = () => {

  const [ficheroPortada, setFicheroPortada] = useState(undefined);
  const [ficheros, setFicheros] = useState([]);
  const [subiendo, setSubiendo] = useState(false);
  const [estado, dispatch] = useReducer(servicioReductor, ESTADO_INICIAL);
  
  {/* MANEJAMOS LOS CAMBIOS DE ESTADO */}
  const manejarCambio= (evento) =>{
    dispatch({type: "CAMBIAR_ENTRADA", payload:{name: evento.target.name, value:evento.target.value}})
  }

  {/* MANEJAMOS LAS SOLICITUDES DE AÑADIR CARACTERÍSTICAS */}
  const manejarCaracteristica = (evento) =>{

    evento.preventDefault();

    dispatch({type: "AGREGAR_CARACTERISTICA", payload: evento.target[0].value,
  });

    evento.target[0].value = "";
  };


  {/* MANEJAMOS LA SUBIDA DE IMÁGENES */}
  const manejarSubir = async () =>{

    setSubiendo(true);
    try{
      const portada = await subirArchivo(ficheroPortada);

      const imagenes = await Promise.all(
        [...ficheros].map(async (fichero) =>{
          const url = await subirArchivo(fichero)
          return url;
        }
        ));
      setSubiendo(false);
      dispatch({type:"AGREGAR_IMAGENES", payload:{portada, imagenes}})
    }catch(error){
      console.log(error)
    }
  };

  const navegar = useNavigate();

  const consultaCliente =useQueryClient();

      const mutacion = useMutation({
        mutationFn: (servicio) => {
            return nuevaSolicitud.post("/", servicio);
        },
        onSuccess:()=>{
            consultaCliente.invalidateQueries(["misServicios"]);
        }
      });

  {/* MANEJAMOS EL ENVÍO Y CREACIÓN DEL SERVICIO */}
  const manejarEnvio = (evento) =>{
    evento.preventDefault();
    mutacion.mutate(estado);
    navegar(`/servicios/`); // misServicios
  }

  console.log(estado);

  return (
    <div className="agregar">
      <div className="contenedor">
        <h1>Nuevo servicio</h1>
        <div className="secciones">
          <div className="informacion">
            <label htmlFor="">Título</label>
            <input
              type="text"
              name="titulo"
              placeholder="ejemplo: voy a limpiar las zonas comunes de tu casa"
              onChange={manejarCambio}
            />

            {/*CATEGORÍAS DE SERVICIOS */}
            <label htmlFor="">Categoría</label>
            <select name="categoria" id="categoria" onChange={manejarCambio}>
            <option value="">Seleccionar</option>
              <option value="limpieza">Limpieza</option>
              <option value="reparaciones">Reparaciones</option>
              <option value="mudanzas">Mudanzas</option>
              <option value="cuidado_de_mayores">Cuidado de mayores</option>
              <option value="mascotas">Paseo y cuidado de mascotas</option>
            </select>
            <div className="imagenes">
              <div className="entradaImagenes">
            <label htmlFor="">Imagen de portada</label>
            <input type="file" onChange={(evento)=>setFicheroPortada(evento.target.files[0])}/>
            <label htmlFor="">Subir imágenes</label>
            <input type="file" multiple onChange={(evento)=>setFicheros(evento.target.files)}/>
            </div>
            <button onClick={manejarSubir}>{subiendo ? "Subiendo..." : "Subir"}</button>
            </div>
            <label htmlFor="">Descripción</label>
            <textarea name="descripcion" id="" placeholder="Muestra a los clientes en qué consiste tu servicio" cols="0" rows="16" onChange={manejarCambio}></textarea>
            <button onClick={manejarEnvio}>Crear</button>
          </div>
          <div className="detalles">
            <label htmlFor="">Título del servicio</label>
            <input name="tituloCorto" type="text" placeholder="ejemplo: limpieza profunza del hogas" onChange={manejarCambio}/>
            <label htmlFor="">Descripción corta</label>
            <textarea name="descripcionCorta" id="" placeholder="Describe brevemente los detalles de tu servicio" cols="30" rows="10" onChange={manejarCambio}></textarea>
            <label htmlFor="">Tiempo de realización (ejemplo: 2 días)</label>
            <input type="number" name="diasRealizacion" onChange={manejarCambio}/>
            <label htmlFor="">Número de revisiones</label>
            <input type="number" name="serviciosRealizados" onChange={manejarCambio}/>

            {/* AÑADIR CARACTERÍSTICAS */}
            <label htmlFor="">Agregar características</label>

            <form action="" className="agregar" onSubmit={manejarCaracteristica}>
            <input type="text" placeholder="ejemplo: flexibilidad horaria" />
            <button type="submit">Agregar</button>
            </form>

            <div className="caracteristicasAgregadas">
                {estado?.caracteristicas?.map((ficheros) => (
                <div className="elemento" key={ficheros}>
                  <button onClick={()=> dispatch({type:"ELIMINAR_CARACTERISTICA", payload: ficheros})}>
                    {ficheros}
                    <span>X</span>
                  </button>
                </div>))}
            </div>
            <label htmlFor="">Precio / hora</label>
            <input type="number" onChange={manejarCambio} name="precio"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agregar;