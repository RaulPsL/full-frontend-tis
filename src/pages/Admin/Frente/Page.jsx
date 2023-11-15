import { useState, useEffect } from "react";
import { Admin } from "../../../components/layout/admin/Admin";
import { Grid, Typography } from "@mui/material";
import { containerChartStyles } from "../Home/utils/HomeStyles";
import TableProducts from "../../../hooks/Table/Table_Frente_Eleccion";

import ButtonProducts from "../../../hooks/utils/Button";

import Drawer from "../../../hooks/Drawer/Drawer";
import { getApiFrente } from "../../../api/api";

import Form_Frente from "../../../hooks/Forms/Form_Frente";

const Page_Frente = () => {
  const name = "Frente";

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [frentes, setFrente] = useState([]);
  const [edit, setedit] = useState(false);
  const [selectedFrente, setSelectedFrente] = useState(null);
  useEffect(() => {
    getFrente();
  }, []);
  const [radio, setradio] = useState(false);
  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };
  const editTrue = () => {
    setedit(true);
  };

  const editFalse = () => {
    setedit(false);
  };
  const handleChange = () => {
    setradio(!radio);
  };
  async function getFrente() {
    try {
      const frentesData = await getApiFrente();
      setFrente(frentesData);
      console.log(frentes);
    } catch (error) {
      console.error("Error fetching Frentes:", error);
    }
  }
  const handleEdit = (frentes) => {
    setSelectedFrente(frentes);
  };

  return (
    <Admin>
      <Grid container spacing={2}>
        {/* ... */}
        <Grid item xs={12} md={12} lg={12}>
          <Grid container style={containerChartStyles}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                sx={{ borderBottom: "2px solid black", width: "100%" }}
              >
                {name}
              </Typography>

              <ButtonProducts
                handleChange={handleChange}
                selectedProduct={selectedFrente}
                openDrawer={openDrawer}
                editFalse={editFalse}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container style={containerChartStyles}>
            <Grid item xs={12}>
              <TableProducts
                frentes={frentes}
                handleEdit={handleEdit}
                openDrawer={openDrawer}
                editTrue={editTrue}
                getProduct={getFrente}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div>
        <Drawer
          isOpen={drawerOpen}
          onClose={closeDrawer}
          selectedProduct={selectedFrente}
          edit={edit}
          getProduct={getFrente}
          name={name}
          form={
            <Form_Frente
              onClose={closeDrawer}
              selectedProduct={selectedFrente}
              edit={edit}
              getProduct={getFrente}
            />
          }
        />
      </div>
    </Admin>
  );
};

export default Page_Frente;
