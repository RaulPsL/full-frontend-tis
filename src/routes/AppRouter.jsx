import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomeClient from "../pages/Client/Home/Home";

import HomeAdmin from "../pages/Admin/Home/Page";

import Login from "../auth/Login";
import Cookies from "js-cookie";

import Page_elecc from "../pages/Admin/Elecc/Page";
import Page_Frente from "../pages/Admin/Frente/Page";
import Page_Comite from "../pages/Admin/Comite/Page";
import Create_Comite from "../pages/Admin/Comite/Sub/Create_comite";
import Page_Mesa from "../pages/Admin/participantes/Jurado/Page";
import Page_Estudiantes from "../pages/Admin/participantes/Estudiantes/Page";
import Page_Docentes from "../pages/Admin/participantes/Docentes/Page";

export const AppRouter = () => {
  const authToken = Cookies.get("token");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeClient />} />
        <Route
          path="/login"
          element={authToken ? <Navigate to="/admin" /> : <Login />}
        />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/elecc" element={<Page_elecc />} />
        <Route path="/admin/frente" element={<Page_Frente />} />
        <Route path="/admin/comite" element={<Page_Comite />} />
        <Route path="/admin/comite/create" element={<Create_Comite />} />
        <Route path="/Admin/participantes/Docentes" element={<Page_Docentes />} />
        <Route path="/Admin/participantes/Estudiantes" element={<Page_Estudiantes />} />
        <Route path="/Admin/participantes/Jurado" element={<Page_Mesa />} />
      </Routes>
      <Routes>
        <Route
          path="/admin/elecc"
          element={isAuthenticated ? <Page_elecc /> : <Navigate to="/" />}
        />
        <Route 
          path="/admin/frente" 
          element={isAuthenticated ? <Page_Frente /> : <Navigate to="/"/>} 
        />
        <Route 
          path="/admin/comite" 
          element={isAuthenticated ? <Page_Comite /> : <Navigate to="/"/>} 
        />
        <Route 
          path="/admin/comite/create" 
          element={isAuthenticated ? <Create_Comite /> : <Navigate to="/"/>} 
        />
      </Routes>
    </Router>
  );
};
