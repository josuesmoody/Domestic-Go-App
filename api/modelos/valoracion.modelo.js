import mongoose from 'mongoose';

const { Schema } = mongoose;

const EsquemaValoracion = new Schema({
    idServicio:{
        type: String,
        required: true
    },
    idUsuario:{
        type: String,
        required: true
    },
    estrella:{
        type: Number,
        required: true,
        enum:[1, 2, 3, 4, 5],
    },
    descripcion:{
        type: String,
        required: true,
    },
},{
    timestamps:true
});

export default mongoose.model("Valoracion", EsquemaValoracion);