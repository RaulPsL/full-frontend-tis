import { useState, useEffect } from "react";
import { Admin } from "../../../../components/layout/admin/Admin";
import { Grid, MenuItem, Select, Typography } from "@mui/material";
import { containerChartStyles } from "../../Home/utils/HomeStyles";
import ButtonProducts from "../../../../hooks/utils/Button";

import Drawer from "../../../../hooks/Drawer/Drawer";
import { getApiConv, getApiElecc, getApiFac, getApiJurado } from "../../../../api/api";
import Form_Jurado from "../../../../hooks/Forms/Form_Jurado";
import ViewMesasEleccion from "../../../../hooks/Table/Table_Jurado";

const Page_Mesa = () => {
  const name = "Jurados y Mesas";

  
  const [convocatorias, setConvocatorias] = useState([]);
  const [convocatoria, setConvocatoria] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [edit, setedit] = useState(false);
  const [elecciones, setElecciones] = useState([]);
  const [jurados, setJurados] = useState([]);
  

  const [radio, setradio] = useState(false);

  const handleConvocatoriaChange = (event) => {
    setConvocatoria(event.target.value);
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
  
  useEffect(() => {
    const fetchData = async () => {
        try {
          let result = await getApiElecc();
          setElecciones(result);
          result = await getApiConv();
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
                { elecciones.map((eleccion) => {
                  return eleccion.relacion_eleccconvo.map((convocatoria, index) => {
                    if (String(convocatoria.ACTIVO).toUpperCase() === 'ACTIVO'){
                      return <MenuItem key={index} value={convocatoria.NOMBRE_CONVOCATORIA}>
                                {convocatoria.NOMBRE_CONVOCATORIA}
                              </MenuItem>;
                    }else{
                      return null;
                    }})
                })}
              </Select>
              <ButtonProducts
                handleChange={handleChange}
                openDrawer={openDrawer}
                editFalse={editFalse}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container style={containerChartStyles}>
            <Grid item xs={12}>
              <ViewMesasEleccion convocatorias={ convocatorias } jurados={ jurados } nombre_convocatoria= { convocatoria } />
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
              edit={edit}
            />
          }
        />
      </div>
    </Admin>
  );
};

export default Page_Mesa;
