import mongoose from 'mongoose';

const { Schema } = mongoose;

const EsquemaServicio = new Schema({
    idUsuario:{
        type: String,
        required: true,
    },
    titulo:{
        type: String,
        required: true,
    },
    descripcion:{
        type: String,
        required: true,
    },
    estrellasTotales:{
        type: Number,
        default: 0,
    },
    numeroEstrella:{
        type: Number,
        default: 0,
    },
    categoria:{
        type: String,
        required: true,
    },
    precio:{
        type: Number,
        required: true,
    },
    portada:{
        type: String,
        required: true,
    },
    imagenes:{
        type: [String],
        required: false,
    },
    tituloCorto:{
        type: String,
        required: true,
    },
    descripcionCorta:{
        type: String,
        required: true,
    },
    diasRealizacion:{
        type: Number,
        required: true,
    },
    serviciosRealizados:{
        type: Number,
        default: 0,
    },
    caracteristicas:{
        type: [String],
        required: false,
    },
},{
    timestamps:true
});

export default mongoose.model("Servicio", EsquemaServicio);