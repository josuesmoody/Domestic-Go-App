import mongoose from 'mongoose';

const { Schema } = mongoose;

const EsquemaConversacion = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    idOfertante: {
        type: String,
        required: true,
    },
    idCliente: {
        type: String,
        required: true,
    },
    lecturaOfertante: {
        type: Boolean,
        required: true,
    },
    lecturaCliente: {
        type: Boolean,
        required: true,
    },
    ultimoMensaje: {
        type: String,
        required: false,
    },
},{
    timestamps:true
});

export default mongoose.model("Conversacion", EsquemaConversacion);