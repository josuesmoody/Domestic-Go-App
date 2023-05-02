import mongoose from "mongoose";
const { Schema } = mongoose;

const EsquemaContratacion = new Schema(
  {
    idServicio: {
      type: String,
      required: true,
    },
    imagen: {
      type: String,
      required: false,
    },
    titulo: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    idOfertante: {
      type: String,
      required: true,
    },
    idCliente: {
      type: String,
      required: true,
    },
    completado: {
      type: Boolean,
      default: false, //probar
    },
    intento_de_pago: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Contratacion", EsquemaContratacion);