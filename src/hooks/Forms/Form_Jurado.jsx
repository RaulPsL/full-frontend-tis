import { useState } from "react";
import PropTypes from "prop-types";

import {
  FormControl,
  CssBaseline,
  InputLabel,
  Select,
  MenuItem,
  Input,
} from "@mui/material";
import { Grid } from "@mui/material";
import { Box, Button } from "@mui/material";
import { postJurado } from "../../api/api";

const Form_Jurado = ({ convocatorias }) => {
  const [numparticipantes, setNumParticipantes] = useState(0);
  const [cantidadMesas, setCantidadMesas] = useState(0);
  const [selectedconvocatoria, setSelectedConvocatoria] = useState({});
  let selectedValue = 0;

  const handleNumeroParticipantes = (e) => {
    selectedValue = parseInt(e.target.value);
    setNumParticipantes(selectedValue);
    console.log(numparticipantes);
    console.log(selectedconvocatoria);
  }

  const handleCantidadMesasChange = (e) => {
    selectedValue = parseInt(e.target.value);
    setCantidadMesas(selectedValue);
    console.log(cantidadMesas);
  };

  const handleConvocatoriaChange = (e) => {
    selectedValue = convocatorias.find((convocatoria) => convocatoria.NOMBRE_CONVOCATORIA === e.target.value);
    setSelectedConvocatoria(selectedValue);
    console.log(selectedconvocatoria);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let send = {
      ID_CONVOCATORIA:selectedconvocatoria.ID_CONVOCATORIA,
      cantidad:cantidadMesas,
      participantes:numparticipantes,
      relacion_fc:selectedconvocatoria.relacion_fc.map(
        (facultad) => (
          {
            facultad:{
              ID_FACULTAD:facultad.facultad.ID_FACULTAD,
              carrera:facultad.facultad.carrera.map(
                (carrera) => (
                  {
                    ID_CARRERA:carrera.ID_CARRERA
                  }
                ))
            }
          }
        ))
    }
    console.log("Data to send: ", send);
    postJurado('', send);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "95vh",
          }}
        >
          <CssBaseline />

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box sx={{ mt: 2, marginBottom: 2 }}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="facultad">Convocatorias</InputLabel>
                  <Select
                    required
                    label="Convocatorias"
                    name="facultad"
                    value={selectedconvocatoria ? selectedconvocatoria.NOMBRE_CONVOCATORIA:""}
                    onChange={handleConvocatoriaChange}
                    inputProps={{
                      name: "facultad",
                      id: "facultad",
                    }}
                  >
                    { convocatorias.map((convocatoria, keyCon) => (
                      <MenuItem key={ keyCon} value= {convocatoria.NOMBRE_CONVOCATORIA}>
                        { convocatoria.NOMBRE_CONVOCATORIA}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mt: 2, marginBottom: 2 }}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="carrera">Numero de Participantes</InputLabel>
                  <Input
                    required
                    label="Numero de Participantes"
                    name="num"
                    value={numparticipantes}
                    onChange={handleNumeroParticipantes}
                  />
                </FormControl>
              </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="cantidadMesas">
                      Cantidad de Mesas
                    </InputLabel>
                    <Input
                      required
                      label="Cantidad de Mesas"
                      name="cantidadMesas"
                      value={cantidadMesas}
                      onChange={handleCantidadMesasChange}
                    />
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
            
            <Button
              type="submit"
              sx={{
                width: "100%",
                borderRadius: "55px",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.9)",
                mt: 2,
              }}
              variant="contained"
              color="primary"
            >
              {"Crear Jurados"}
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};


export default Form_Jurado;

Form_Jurado.propTypes = {
  convocatorias: PropTypes.array.isRequired
};
