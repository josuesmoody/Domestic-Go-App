import React, {useState} from 'react';
import "./Presentacion.scss";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Presentacion = () => {

  const [entrada, setEntrada] = useState("");
  const navegar = useNavigate();
  const manejarEnvio = () => {
    navegar(`/servicios?categoria=${entrada}`);
  };

    return(
        <div className='presentacion'>
            <div className='contenedor'>

                {/* BUSCADOR */}
                <div className="buscador">
                    <h1><i>El Buscador Oficial de</i> Servicios Domésticos</h1>
                    <div className="buscar">
                        <div className="entradaBuscar">
                            <img src="../../publico/imagenes/buscar.png" alt="" />
                            <input type="text" placeholder='¿Qué categoría buscas?' onChange={(evento) => setEntrada(evento.target.value)}/>
                        </div>
                        <button onClick={manejarEnvio}>Buscar</button>
                    </div>
                    <div className="popular">
                        <Link to="/servicios?categoria=mascotas">
                        <button>Paseo de mascotas</button>
                        </Link>
                        <Link to="/servicios?categoria=cuidado_de_mayores">
                        <button>Apoyo de mayores</button>
                        </Link>
                        <Link to="/servicios?categoria=limpieza">
                        <button>Limpieza de hogar</button>
                        </Link>
                        <Link to="/servicios?categoria=mudanzas">
                        <button>Mudanzas</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Presentacion;