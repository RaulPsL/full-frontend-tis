import { useState, useEffect } from "react";
import { Admin } from "../../../components/layout/admin/Admin";
import { Grid, MenuItem, Select, Typography } from "@mui/material";
import { containerChartStyles } from "../Home/utils/HomeStyles";

import Drawer from "../../../hooks/Drawer/Drawer";
import {
  getApi,
  getApiConv,
  getApiJurado,
  putEditJurado,
} from "../../../api/api";
import Form_Jurado from "../../../hooks/Forms/Form_Jurado";

import Table_Votos from "../../../hooks/Table/Table_Votos";

const Page_Votos = () => {
  const name = "Registro de Votos";

  const [convocatorias, setConvocatorias] = useState([]);
  const [convocatoria, setConvocatoria] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [jurados, setJurados] = useState([]);
  const [votos, setVotos] = useState([]);

  const handleConvocatoriaChange = (event) => {
    setConvocatoria(event.target.value);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const changeJurado = async (request, id_jurado) => {
    let data = JSON.stringify(request);
    putEditJurado(id_jurado, data);
  };

  const fetchData = async () => {
    try {
      const [convResult, juradoResult, votosResult] = await Promise.all([
        getApiConv(),
        getApiJurado(),
        getApi("votos"),
      ]);

      setConvocatorias(convResult);
      setJurados(juradoResult);
      setVotos(votosResult);

      console.log("Convocatorias:", convResult);
      console.log("Jurados:", juradoResult);
      console.log("Votos:", votosResult);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Admin>
      <Grid container spacing={2}>
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
                sx={{ width: "100%", top: "12px" }}
              >
                {convocatorias.map((convocatoria, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={convocatoria.NOMBRE_CONVOCATORIA}
                    >
                      {convocatoria.NOMBRE_CONVOCATORIA}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container style={containerChartStyles}>
            <Grid item xs={12}>
              <Table_Votos
                convocatorias={convocatorias}
                jurados={jurados}
                nombre_convocatoria={convocatoria}
                changeJurado={changeJurado}
                votoss={votos}
                fetchData={fetchData}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div>
        <Drawer
          isOpen={drawerOpen}
          onClose={closeDrawer}
          name={name}
          form={
            <Form_Jurado onClose={closeDrawer} convocatorias={convocatorias} />
          }
        />
      </div>
    </Admin>
  );
};

export default Page_Votos;
