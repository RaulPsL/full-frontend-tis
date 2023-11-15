import { useState, useEffect } from "react";
import { Admin } from "../../../components/layout/admin/Admin";
import { Button, Grid, Typography } from "@mui/material";
import { containerChartStyles } from "../Home/utils/HomeStyles";
import Table_User from "../../../hooks/Table/Table_User";
// eslint-disable-next-line no-unused-vars
import styled from "styled-components";
import { Link } from "react-router-dom";

import { getApi } from "../../../api/api";
// import Form_User from "../../../hooks/Forms/Form_User";
import AddIcon from "@mui/icons-material/Add";
const Page_Comite = () => {
  const name = "Comite";

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [edit, setedit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    getProduct();
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
      const productsData = await getApi("product");
      setProduct(productsData);
      console.log(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  const handleEdit = (product) => {
    setSelectedProduct(product);
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
                Comite
              </Typography>

              <div>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Link to="/admin/comite/create">
                      <Button
                        variant="contained"
                        color="success"
                        endIcon={<AddIcon />}
                        sx={{ borderRadius: 3, marginTop: 2, marginRight: 1 }}
                      >
                        Nuevo
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container style={containerChartStyles}>
            <Grid item xs={12}>
              {/* <Table_User
                products={product}
                handleEdit={handleEdit}
                openDrawer={openDrawer}
                editTrue={editTrue}
                getProduct={getProduct}
              /> */}
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

export default Page_Comite;
