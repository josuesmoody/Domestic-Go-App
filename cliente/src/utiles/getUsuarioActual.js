const getUsuarioActual = () =>{
    return JSON.parse(localStorage.getItem("usuarioActual"));
};

export default getUsuarioActual;