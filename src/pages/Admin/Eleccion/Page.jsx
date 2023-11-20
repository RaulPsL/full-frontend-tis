import { useState, useEffect } from "react";
import { Admin } from "../../../components/layout/admin/Admin";
import { Button, Grid, Typography } from "@mui/material";
import { containerChartStyles } from "../Home/utils/HomeStyles";
import Table_User from "../../../hooks/Table/Table_User";
import { boletaPDF } from "../../../api/api"

import { Link } from "react-router-dom";
import { getApiConv } from "../../../api/api";
import AddIcon from "@mui/icons-material/Add";
const Page_Eleccion = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [edit, setedit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    getProduct();
    console.log(product);
  }, []);

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };
  const editTrue = () => {
    setedit(true);
  };

  async function getProduct() {
    try {
      const productsData = await getApiConv();
      setProduct(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleViewPDF = (e) => {
    e.preventDefault();
    boletaPDF().then(response=>{
      console.log('ok')
    });
  }
  
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
                Eleccion
              </Typography>

              <div>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Link to="/admin/eleccion/create">
                      <Button
                        variant="contained"
                        color="success"
                        endIcon={<AddIcon />}
                        sx={{ borderRadius: 3, marginTop: 2, marginRight: 1 }}
                      >
                        Nuevo
                      </Button>
                    </Link>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={e=>handleViewPDF(e)}
                        sx={{ borderRadius: 3, marginTop: 2, marginRight: 1 }}
                      >
                        Ver Boleta De Eleccion
                      </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container style={containerChartStyles}>
            <Grid item xs={12}>
              <Table_User
                products={product}
                handleEdit={handleEdit}
                openDrawer={openDrawer}
                editTrue={editTrue}
                getProduct={getProduct}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <div>
        <Drawer
          isOpen={drawerOpen}
          onClose={closeDrawer}
          selectedProduct={selectedProduct}
          edit={edit}
          getProduct={getProduct}
          name={name}
          form={
            <Form_User
              onClose={closeDrawer}
              selectedProduct={selectedProduct}
              edit={edit}
              getProduct={getProduct}
            />
          }
        />
      </div> */}
    </Admin>
  );
};

export default Page_Eleccion;
