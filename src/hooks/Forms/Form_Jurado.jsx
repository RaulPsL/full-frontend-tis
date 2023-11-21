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
  const [convocatoria, setConvocatoria] = useState({});
  const [num_participantes, setNum_participantes] = useState(0);
  const [cantidadMesas, setCantidadMesas] = useState(0);


  const handleCantidadMesasChange = (e) => {
    const selectedValue = parseInt(e.target.value, 10);
    setCantidadMesas(selectedValue);
  };

  const handleConvocatoriaChange = (e) => {
    console.log(convocatorias);
    const selected = convocatorias.find((convocatoria) => convocatoria.NOMBRE_CONVOCATORIA === e.target.value);
    setConvocatoria(selected);
    console.log(selected);
    console.log(convocatoria);
  };

  const handleNumeroParticipantes = (e) => {
    const num = parseInt(e.target.value);
    setNum_participantes(num);
    console.log(num_participantes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      ID_CONVOCATORIA: convocatoria.ID_CONVOCATORIA,
      cantidad: cantidadMesas,
      cantidad_usuarios: num_participantes,
      relacion_fc: convocatoria.relacion_fc.map(
        (relacion)=> {
          return {
            ID_FACULTAD: relacion.ID_FACULTAD,
            facultad: {
              ID_FACULTAD: relacion.facultad.ID_FACULTAD,
              carrera: relacion.facultad.carrera.map(
                (carrera) => {
                  return {
                    ID_CARRERA:carrera.ID_CARRERA
                  }})
            }
          }
        }
      )
    }
    console.log(data);
    data = JSON.stringify(data);
    postJurado('', data);
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
                    <InputLabel htmlFor="facultad">Convocatotrias</InputLabel>
                    <Select
                      required
                      label="Convocatoria"
                      name="Convocatoria"
                      value={ convocatoria !== null ? convocatoria.NOMBRE_CONVOCATORIA:"" }
                      onChange={ (e) => handleConvocatoriaChange(e)}
                    >
                      {
                        convocatorias.map((convocatoria, keyConv) => (
                          <MenuItem key={ keyConv } value={convocatoria.NOMBRE_CONVOCATORIA}>
                            {convocatoria.NOMBRE_CONVOCATORIA}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ mt: 2, marginBottom: 2 }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="facultad">Numero de participantes</InputLabel>
                    <Input
                      required
                      label="Convocatoria"
                      name="Convocatoria"
                      value={num_participantes ? num_participantes : null}
                      onChange={handleNumeroParticipantes}
                    >
                    </Input>
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
                      value={cantidadMesas ? cantidadMesas : null}
                      onChange={handleCantidadMesasChange}
                    >
                    </Input>
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
              { "Crear Elección" }
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Form_Jurado;

Form_Jurado.propTypes = {
  convocatorias: PropTypes.array.isRequired,
};
