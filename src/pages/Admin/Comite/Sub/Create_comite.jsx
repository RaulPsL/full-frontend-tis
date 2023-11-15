import { Typography } from "@mui/material";
import { useState } from "react";
import { Admin } from "../../../../components/layout/admin/Admin";

import Drawer from "../../../../hooks/Drawer/Drawer";
// eslint-disable-next-line no-unused-vars
import { styled } from "@mui/material/styles";
import Form_Comite from "../../../../hooks/Forms/Form_Comite";

function Create_Comite() {
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
        Crear Comite
      </Typography>

      <Form_Comite
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
export default Create_Comite;
