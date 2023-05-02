import mongoose from 'mongoose';

const { Schema } = mongoose;

const EsquemaUsuario = new Schema({
    nombreUsuario: {
        type: String,
        required: true,
        unique: true,
    },
    correo: {
        type: String,
        required: true,
        unique: true,
    },
    clave: {
        type: String,
        required: true,
    },
    imagen: {
        type: String,
        required: false,
    },
    pais: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: false,
    },
    descripcion: {
        type: String,
        required: false,
    },
    esOfertante: {
        type: Boolean,
        default: false,
    },
},{
    timestamps:true
});

export default mongoose.model("Usuario", EsquemaUsuario);