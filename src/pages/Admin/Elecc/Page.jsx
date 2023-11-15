import { useState, useEffect } from "react";
import { Admin } from "../../../components/layout/admin/Admin";
import { Grid, Typography } from "@mui/material";
import { containerChartStyles } from "../Home/utils/HomeStyles";
import TableEleccion from "../../../hooks/Table/Table_Eleccion";

import ButtonProducts from "../../../hooks/utils/Button";

import Drawer from "../../../hooks/Drawer/Drawer";
import { getApiElecc } from "../../../api/api";

import Form_Elecc from "../../../hooks/Forms/Form_Elecc";

const Page_elecc = () => {
  const name = "Eleccion";

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [convocatoria, setProduct] = useState([]);
  const [edit, setedit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    getProduct();
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
  async function getProduct() {
    try {
      const productsData = await getApiElecc();
      setProduct(productsData);
      console.log(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  const handleEdit = (convocatoria) => {
    setSelectedProduct(convocatoria);
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
                selectedProduct={selectedProduct}
                openDrawer={openDrawer}
                editFalse={editFalse}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container style={containerChartStyles}>
            <Grid item xs={12}>
              <TableEleccion
                elecciones={convocatoria}
                handleEdit={handleEdit}
                openDrawer={openDrawer}
                editTrue={editTrue}
                getProduct={getProduct}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div>
        <Drawer
          isOpen={drawerOpen}
          onClose={closeDrawer}
          selectedProduct={selectedProduct}
          edit={edit}
          getProduct={getProduct}
          name={name}
          form={
            <Form_Elecc
              onClose={closeDrawer}
              selectedProduct={selectedProduct}
              edit={edit}
              getProduct={getProduct}
            />
          }
        />
      </div>
    </Admin>
  );
};

export default Page_elecc;
