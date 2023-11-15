import { useState } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { iconsList } from "./items/IconsList";
import PeopleIcon from "@mui/icons-material/People";
import { Drawer } from "../../layout/admin/AdminComponents";
import { CustomListItem } from "./items/CustomListItem";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const NavBar = ({ open, mode }) => {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const backgroundDia = {
    background: "#FCFCFC",
    color: "black",
  };
  const backgroundNoche = {
    background: "#242526",
    color: "white",
  };

  const [subMenu1Open, setSubMenu1Open] = useState(false);
  const [subMenu2Open, setSubMenu2Open] = useState(false);

  const handleSubMenu1Click = () => {
    setSubMenu1Open(!subMenu1Open);
  };

  const handleSubMenu2Click = () => {
    setSubMenu2Open(!subMenu2Open);
  };

  const handleLinkClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{
        sx: {
          ...(mode ? backgroundDia : backgroundNoche),
        },
      }}
    >
      <DrawerHeader>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <img
            src="https://www.umss.edu.bo/wp-content/uploads/2018/01/logo-fcyt.png"
            alt="Logo"
            style={{
              width: open ? "50%" : "50%",
              height: "auto",
              opacity: open ? 1 : 0.5,
              transition: "opacity 0.3s ease-in-out",
              padding: "5px",
            }}
          />
        </Box>
      </DrawerHeader>

      <Divider />

      <List>
        <CustomListItem
          to="/Admin"
          text="Inicio"
          icon={iconsList["Inicio"]}
          onClick={handleLinkClick}
        />
        <Divider />
        <CustomListItem
          to="/admin/eleccion"
          text="Eleccion"
          icon={iconsList["Inicio"]}
          onClick={handleLinkClick}
        />
        <CustomListItem
          to="/admin/comite"
          text="Comite electoral"
          icon={iconsList["Inicio"]}
          onClick={handleLinkClick}
        />
        <Divider />

        <Divider />
        <CustomListItem
          text="Participantes"
          icon={subMenu1Open ? <ExpandLessIcon /> : <ExpandMoreIcon />} // Cambia el icono según el estado del submenú
          onClick={handleSubMenu1Click}
        />
        {subMenu1Open && (
          <List>
            <CustomListItem
              to="/Admin/participantes/Docentes"
              text="Docentes"
              icon={<LocalMallIcon />}
              onClick={handleLinkClick}
            />
            <CustomListItem
              to="/Admin/participantes/Estudiantes"
              text="Estudiantes"
              icon={<LocalMallIcon />}
              onClick={handleLinkClick}
            />
            <CustomListItem
              to="/Admin/participantes/Jurado"
              text="Jurados y Mesas"
              icon={<LocalMallIcon />}
              onClick={handleLinkClick}
            />
          </List>
        )}
        <Divider />

        <CustomListItem
          text="Registros"
          icon={subMenu2Open ? <ExpandLessIcon /> : <ExpandMoreIcon />} // Cambia el icono según el estado del submenú
          onClick={handleSubMenu2Click}
        />
        {subMenu2Open && (
          <List>
            <CustomListItem
              to="/admin/convocatoria"
              text="Convocatoria"
              icon={<PeopleIcon />}
              onClick={handleLinkClick}
            />
            <CustomListItem
              to="/admin/elecc"
              text="Eleccion"
              icon={<PeopleIcon />}
              onClick={handleLinkClick}
            />
            <CustomListItem
              to="/admin/frente"
              text="Frente"
              icon={<PeopleIcon />}
              onClick={handleLinkClick}
            />
          </List>
        )}
      </List>
    </Drawer>
  );
};

NavBar.propTypes = {
  open: PropTypes.bool.isRequired,
  mode: PropTypes.bool.isRequired,
};

export default NavBar;
