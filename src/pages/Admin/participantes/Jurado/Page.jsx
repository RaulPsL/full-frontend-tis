import { useState, useEffect } from "react";
import { Admin } from "../../../../components/layout/admin/Admin";
import { Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import { containerChartStyles } from "../../Home/utils/HomeStyles";
import ButtonProducts from "../../../../hooks/utils/Button";

import Drawer from "../../../../hooks/Drawer/Drawer";
import { getApiConv, getApiJurado, putEditJurado } from "../../../../api/api";
import Form_Jurado from "../../../../hooks/Forms/Form_Jurado";
import ViewMesasEleccion from "../../../../hooks/Table/Table_Jurado";
import { Link } from "react-router-dom";

const Page_Mesa = () => {
  const name = "Jurados y Mesas";

  
  const [convocatorias, setConvocatorias] = useState([]);
  const [convocatoria, setConvocatoria] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [edit, setedit] = useState(false);
  const [jurados, setJurados] = useState([]);
  const [radio, setradio] = useState(false);
  const [boton, setboton] = useState(false);

  const handleConvocatoriaChange = (event) => {
    setConvocatoria(event.target.value);
    setboton(true);
  };

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const editFalse = () => {
    setedit(false);
  };
  const handleChange = () => {
    setradio(!radio);
  };

  const changeJurado = async (request, id_jurado) => {
    let data = JSON.stringify(request);
    putEditJurado(id_jurado, data);
  }
  
  useEffect(() => {
    const fetchData = async () => {
        try {
          let result = await getApiConv();
          setConvocatorias(result);
          result = await getApiJurado();
          setJurados(result);
          console.log(jurados);
        } catch (error) {
          console.log('Error fetching data: ', error);
        }
      }
      fetchData();
  }, []);
  return (
    <Admin>
      <Grid container spacing={2}>
        {/* ... */}
        <Grid item xs={12} md={12} lg={12}>
          <Grid container style={containerChartStyles}>
            <Grid item xs={20}>
              <Typography
                variant="h4"
                sx={{ borderBottom: "2px solid black", width: "100%" }}
              >
                {name}
              </Typography>

              <Select
                value={convocatoria}
                label="Seleccionar Convocatoria"
                id="frente-select"
                onChange={handleConvocatoriaChange}
                sx={{ width: "100%", top:"12px" }}
              >
                { convocatorias.map((convocatoria, index) => {
                  return <MenuItem key={index} value={convocatoria.NOMBRE_CONVOCATORIA}>
                            {convocatoria.NOMBRE_CONVOCATORIA}
                          </MenuItem>;
                })}
              </Select>
              <Grid container alignItems="center">
                <Grid item>
                  <ButtonProducts
                    handleChange={handleChange}
                    openDrawer={openDrawer}
                    editFalse={editFalse}
                  />
                </Grid>
                {boton ? (
                  <Grid item>
                    <Link to="/MapaMesas">
                      <Button variant="outlined">
                        {"MOSTRAR MAPA"}
                      </Button>
                    </Link>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container style={containerChartStyles}>
            <Grid item xs={12}>
              <ViewMesasEleccion 
                convocatorias={ convocatorias } 
                jurados={ jurados } 
                nombre_convocatoria= { convocatoria }
                changeJurado={ changeJurado }
                />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div>
        <Drawer
          isOpen={drawerOpen}
          onClose={closeDrawer}
          edit={edit}
          name={name}
          form={
            <Form_Jurado
              onClose={closeDrawer}
              convocatorias={ convocatorias }
            />
          }
        />
      </div>
    </Admin>
  );
};

export default Page_Mesa;
