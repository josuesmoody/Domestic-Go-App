import getUsuarioActual from "../utiles/getUsuarioActual";

export const ESTADO_INICIAL = {
    idUsuario: getUsuarioActual()?._id,
    titulo: "",
    categoria: "",
    portada: "",
    imagenes: [],
    descripcion: "",
    tituloCorto: "",
    descripcionCorta: "",
    diasRealizacion: 0,
    serviciosRealizados: 0,
    caracteristicas: [],
    precio: 0,
  };
  
  export const servicioReductor = (estado, accion) => {
    switch (accion.type) {
      case "CAMBIAR_ENTRADA":
        return {
          ...estado,
          [accion.payload.name]: accion.payload.value,
        };
      case "AGREGAR_IMAGENES":
        return {
          ...estado,
          portada: accion.payload.portada,
          imagenes: accion.payload.imagenes,
        };
      case "AGREGAR_CARACTERISTICA":
        return {
          ...estado,
          caracteristicas: [...estado.caracteristicas, accion.payload],
        };
      case "ELIMINAR_CARACTERISTICA":
        return {
          ...estado,
          caracteristicas: estado.caracteristicas.filter(
            (caracteristica) => caracteristica !== accion.payload
          ),
        };
  
      default:
        return estado;
    }
  };