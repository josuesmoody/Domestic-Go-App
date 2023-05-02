const crearError = (estado, mensaje) => {
    const error = new Error();
    error.status = estado;
    error.message = mensaje;

    return error;
};

export default crearError;