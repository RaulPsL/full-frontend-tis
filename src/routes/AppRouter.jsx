import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import HomeClient from "../pages/Client/Home/Page";

import HomeAdmin from "../pages/Admin/Home/Page";
// import { useAuth0 } from "@auth0/auth0-react";
//import Login from "../auth/Login";
//import Cookies from "js-cookie";
import Convocatoria from "../pages/Admin/Convocatoria/Page";
import Page_Eleccion from "../pages/Admin/Eleccion/Page";
import Create_Eleccion from "../pages/Admin/Eleccion/Sub/Create_Eleccion";
import Page_elecc from "../pages/Admin/Elecc/Page";
import Page_Frente from "../pages/Admin/Frente/Page";
import Page_Comite from "../pages/Admin/Comite/Page";
import Create_Comite from "../pages/Admin/Comite/Sub/Create_comite";
import Page_Mesa from "../pages/Admin/participantes/Jurado/Page";
import Page_Estudiantes from "../pages/Admin/participantes/Estudiantes/Page";
import Page_Docentes from "../pages/Admin/participantes/Docentes/Page";
import Jurado from "../pages/Client/Jurado/Page";
import Comite from "../pages/Client/Comite/Page";
import Convocatorias from "../pages/Client/Convocatorias/Page";
import Habilitados from "../pages/Client/Habilidatos/Page";
import MapaComponent from "../pages/Mapa/Page";
export const AppRouter = () => {
  //const authToken = Cookies.get("token");
  // const isAuthenticated = useAuth0();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeClient />} />
        <Route
          path="/login"
          //element={authToken ? <Navigate to="/admin" /> : <Login />}
        />
        {/**/}
        <Route
          path="/admin/eleccion"
          element={
            // isAuthenticated ? 
            <Page_Eleccion /> 
            // : <Navigate to="/" />
            }
        />
        <Route
          path="/admin/eleccion/create"
          element={
            // isAuthenticated ? 
            <Create_Eleccion /> 
            // : <Navigate to="/" />
            }
        />
        <Route
          path="/admin/convocatoria"
          element={
            // isAuthenticated ? 
            <Convocatoria /> 
            // : <Navigate to="/" />
            }
        />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route
          path="/admin/elecc"
          element={
            // isAuthenticated ? 
            <Page_elecc /> 
            // : <Navigate to="/" />
            }
        />
        <Route
          path="/admin/frente"
          element={
            // isAuthenticated ? 
            <Page_Frente /> 
            // : <Navigate to="/" />
            }
        />
        <Route
          path="/admin/frente"
          element={
            // isAuthenticated ? 
            <Page_Frente /> 
            // : <Navigate to="/" />
            }
        />
        <Route
          path="/admin/comite"
          element={
            // isAuthenticated ? 
            <Page_Comite /> 
            // : <Navigate to="/" />
            }
        />
        <Route
          path="/admin/comite/create"
          element={
            // isAuthenticated ? 
            <Create_Comite /> 
            // : <Navigate to="/" />
            }
        />
        <Route
          path="/Admin/participantes/Docentes"
          element={
            // isAuthenticated ? 
            <Page_Docentes /> 
            // : <Navigate to="/" />
            }
        />
        <Route
          path="/Admin/participantes/Estudiantes"
          element={
            // isAuthenticated ? 
            <Page_Estudiantes /> 
            // : <Navigate to="/" />
            }
        />
        <Route
          path="/Admin/participantes/Jurado"
          element={
            // isAuthenticated ? 
            <Page_Mesa /> 
            // : <Navigate to="/" />
            }
        />
        <Route
          path="/jurado"
          element={
            // isAuthenticated ? 
            <Jurado /> 
            // : <Navigate to="/" />
            }
        />
        <Route
          path="/comite"
          element={
            // isAuthenticated ? 
            <Comite /> 
            // : <Navigate to="/" />
            }
        />
        <Route
          path="/habilitados"
          element={
            // isAuthenticated ? 
            <Habilitados /> 
            // : <Navigate to="/" />
            }
        />
        <Route
          path="/convocatorias"
          element={
            // isAuthenticated ? 
            <Convocatorias /> 
            // : <Navigate to="/" />
            }
        />
        <Route
          path="/MapaMesas"
          element={
            // isAuthenticated ? 
            <MapaComponent /> 
            // : <Navigate to="/" />
            }
        />
        </Routes>
    </Router>
  );
};