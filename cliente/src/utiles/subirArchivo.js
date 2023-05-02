import axios from "axios";

const subirArchivo = async (fichero) =>{
    const datos = new FormData();
    datos.append("file", fichero);
    datos.append("upload_preset", "domesticgo");

    try{
       const respuesta = await axios.post("https://api.cloudinary.com/v1_1/ddm8rd0hz/image/upload/", datos); 

       const {url} = respuesta.data;
       return url;

    }catch(error){
        console.log(error);
    }
};

export default subirArchivo;