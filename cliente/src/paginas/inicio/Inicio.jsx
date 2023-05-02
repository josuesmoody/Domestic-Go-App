import React from 'react';
import "./Inicio.scss";
import Presentacion from "../../componentes/presentacion/Presentacion";
import Socios from "../../componentes/socios/Socios";
import {catCarrusel} from "../../datos";
import Carrusel from "../../componentes/carrusel/Carrusel";
import CategoriaCarrusel from "../../componentes/categoriaCarrusel/CategoriaCarrusel";


const Inicio = () => {
    return(
        <div className='inicio'>
            <Presentacion/>
            <Socios/>
            <Carrusel slidesToShow={5} arrowsScroll={5}>
                {catCarrusel.map(tarjeta=>(
                    <CategoriaCarrusel elemento={tarjeta} key={tarjeta.id}/>
                ))}
            </Carrusel>
            <div className="beneficios">
                <div className="contenedor">
                <div className="elemento">
                    <h1>¿Qué es Domestic Go?</h1>
                </div>
                    <div className="elemento">
                        <video src="../../publico/videos/video-presentacion.mp4" controls poster='../../publico/imagenes/portada-video.png'></video>

                    </div>
                </div>
            </div>

            <div className="premium">
                <div className="contenedor-premium">
                <div className="elemento-premium">
                    <h1><i>Domestic Go</i> Premium</h1>
                    <h1>Consigue más clientes con mayor visibilidad</h1>
                    <p>Mejora tu plan actual y obtén herramientas con mayor potencial</p>
                    <div className="titulo">
                        <img src="publico/imagenes/check.png" alt=""/>
                        Conecta con más clientes dentro de la red
                    </div>
                    <button >Probar Plan Premium</button>
                </div>
                    <div className="elemento-premium">
                        <img src="../../publico/imagenes/plan-premium.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inicio;