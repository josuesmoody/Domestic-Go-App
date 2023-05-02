import mongoose from 'mongoose';

const { Schema } = mongoose;

const EsquemaMensaje = new Schema({
    idConversacion: {
        type: String,
        required: true,
    },
    idUsuario: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
},{
    timestamps:true
});

export default mongoose.model("Mensaje", EsquemaMensaje);