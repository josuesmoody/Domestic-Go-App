import React, {useState} from 'react';
import "./IniciarSesion.scss";
import nuevaSolicitud from '../../utiles/nuevaSolicitud';
import { useNavigate } from 'react-router-dom';

const IniciarSesion = () => {

    const [nombreUsuario, setNombreUsuario] = useState("");
    const [clave, setClave] = useState("");
    const [error, setError] = useState(null);

    const navegar = useNavigate();

    const manejarEnvio = async (evento)=>{
        evento.preventDefault();

        try{
            const respuesta = await nuevaSolicitud.post("/autenticacion/iniciarSesion", {nombreUsuario, clave});
            localStorage.setItem("usuarioActual", JSON.stringify(respuesta.data));
            navegar("/");

          }catch(error){
            setError(error.response.data);
          }
        }

    return(
        <div className='iniciarSesion'>
            <form action="" onSubmit={manejarEnvio}>
                <h1>Iniciar sesión</h1>
                <label htmlFor="">Usuario</label>
                <input name='nombreUsuario' type='text' placeholder='Nombre de usuario' onChange={evento=> setNombreUsuario(evento.target.value)}/>

                <label htmlFor="">Contraseña</label>
                <input type="password" name="clave" onChange={(evento)=> setClave(evento.target.value)}/>
                <button type='submit'>Acceder</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default IniciarSesion;