import React from "react";
import "./CategoriaCarrusel.scss"
import { Link } from "react-router-dom";

const CategoriaCarrusel = ({elemento})=>{

    const manejarClick = (categoria) => {
        console.log(`Clickeaste en ${categoria}`);
        // Aquí puedes agregar la lógica para redirigir a la página correspondiente
    };
    
    return(
        <Link to={elemento.ruta}>
        <div className="categoriaCarrusel" onClick={() => manejarClick(elemento.categoria)}>
    <img src={elemento.imagen} alt="" />
    <span className="descripcion">{elemento.descripcion}</span>
    <span className="titulo">{elemento.titulo}</span>
</div>

        </Link>
    );
};

export default CategoriaCarrusel;