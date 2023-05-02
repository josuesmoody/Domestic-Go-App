import axios from "axios";

const nuevaSolicitud = axios.create({
    baseURL: "http://localhost:8800/api/",
    withCredentials: true,
});

export default nuevaSolicitud;