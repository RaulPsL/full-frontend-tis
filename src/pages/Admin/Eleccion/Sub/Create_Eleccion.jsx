import { Typography } from "@mui/material";
import { useState } from "react";
import { Admin } from "../../../../components/layout/admin/Admin";
import Form_Eleccion from "../../../../hooks/Forms/Form_Eleccion";
import Drawer from "../../../../hooks/Drawer/Drawer";


function Create_Eleccion() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [name, setName] = useState("");
  const [setSelectedFacultad] = useState("");

  const handleNuevoClick = (itemName) => {
    setName(itemName);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  let drawerContent;

  switch (name) {
    case "facultad":
      drawerContent = (
        <Form_Facultad
          onClose={handleCloseDrawer}
          setSelectedFacultad={setSelectedFacultad}
        />
      );
      break;
    case "carrera":
      drawerContent = <Form_Carrera onClose={handleCloseDrawer} />;
      break;

    default:
      drawerContent = null;
  }

  return (
    <Admin>
      <Typography
        variant="h4"
        sx={{ borderBottom: "2px solid black", width: "100%" }}
      >
        Crear Eleccion
      </Typography>

      <Form_Eleccion
        onClose={handleCloseDrawer}
        edit={false}
        onNuevoClick={handleNuevoClick}
      />
      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        name={name}
        form={drawerContent}
      />
    </Admin>
  );
}
export default Create_Eleccion;
