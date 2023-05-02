import React from "react";
import Inicio from "./paginas/inicio/Inicio";
import Footer from "./componentes/footer/Footer";
import Navbar from "./componentes/navbar/Navbar";
import Servicios from "./paginas/servicios/Servicios";
import Servicio from "./paginas/servicio/Servicio";
import Agregar from "./paginas/agregar/Agregar";
import Contrataciones from "./paginas/contrataciones/Contrataciones";
import Mensajes from "./paginas/mensajes/Mensajes";
import Mensaje from "./paginas/mensaje/Mensaje";
import MisServicios from "./paginas/misServicios/MisServicios";
import IniciarSesion from "./paginas/iniciarSesion/IniciarSesion";
import Registrar from "./paginas/registrar/Registrar";
import "./App.scss";
import{createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import {QueryClient, QueryClientProvider,} from "@tanstack/react-query";
import PagoExitoso from "./paginas/pagoExitoso/PagoExitoso";
import Pago from "./paginas/pago/Pago";

function App() {

  const consultaCliente = new QueryClient()

  // El Layout será la estructura disponible en todas las páginas
  const Layout = ()=>{
    return(
      <div className="app">

        <QueryClientProvider client={consultaCliente}>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </QueryClientProvider>
      </div>
    )
  }

  {/* RUTAS DE PÁGINAS */}
  const enrutador = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        //Páginas
        {
          path:"/",
          element: <Inicio/>
        },
        {
          path:"/servicios",
          element: <Servicios/>
        },
        {
          path:"/servicio/:id",
          element: <Servicio/>
        },
        {
          path:"/contrataciones",
          element: <Contrataciones/>
        },
        {
          path:"/misServicios",
          element: <MisServicios/>
        },
        {
          path:"/agregar",
          element: <Agregar/>
        },
        {
          path:"/mensajes",
          element: <Mensajes/>
        },
        {
          path:"/mensaje/:id",
          element: <Mensaje/>
        },
        {
          path:"/iniciarSesion/",
          element: <IniciarSesion/>
        },
        {
          path:"/registrar/",
          element: <Registrar/>
        },
        {
          path:"/pago/:id",
          element: <Pago/>
        },
        {
          path:"/pagoExitoso/",
          element: <PagoExitoso/>
        },
      ]
    },
  ])
  return (
    <div>
      <RouterProvider router={enrutador}/>
    </div>
  );
};

export default App;
