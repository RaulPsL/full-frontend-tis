import { useState } from "react";
import PropTypes from "prop-types";

import {
  FormControl,
  CssBaseline,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
} from "@mui/material";

const Form_Jurado = ({ edit }) => {
  const [mesas, setMesas] = useState([]);
  const [cantidadMesas, setCantidadMesas] = useState(1);
  const [formData, setFormData] = useState({
    facultad: "",
    carrera: "",
  });

  const docentes = [
    {id: "1", nombre: "Erick1", cargo: "Docente",},
    {id: "2", nombre: "Erick2", cargo: "Docente",},
    {id: "3", nombre: "Erick3", cargo: "Docente",},
    {id: "4", nombre: "Erick4", cargo: "Docente",},
    {id: "5", nombre: "Erick5", cargo: "Docente",},
    {id: "6", nombre: "Erick6", cargo: "Docente",},
    {id: "7", nombre: "Erick7", cargo: "Docente",},
    {id: "8", nombre: "Erick8", cargo: "Docente",},
    {id: "9", nombre: "Erick9", cargo: "Docente",},
    {id: "10", nombre: "Erick10", cargo: "Docente",},
    {id: "11", nombre: "Erick11", cargo: "Docente",},
    {id: "12", nombre: "Erick12", cargo: "Docente",},
    {id: "13", nombre: "Erick13", cargo: "Docente",},
    {id: "14", nombre: "Erick14", cargo: "Docente",},
    {id: "15", nombre: "Erick15", cargo: "Docente",},
    {id: "16", nombre: "Erick16", cargo: "Docente",},
    {id: "17", nombre: "Erick17", cargo: "Docente",},
    {id: "18", nombre: "Erick18", cargo: "Docente",},
    {id: "19", nombre: "Erick19", cargo: "Docente",},
    {id: "20", nombre: "Erick20", cargo: "Docente",},
    {id: "21", nombre: "Erick21", cargo: "Docente",},
    {id: "22", nombre: "Erick22", cargo: "Docente",},
    {id: "23", nombre: "Erick23", cargo: "Docente",},
    {id: "24", nombre: "Erick24", cargo: "Docente",},
    {id: "25", nombre: "Erick25", cargo: "Docente",},
    {id: "26", nombre: "Erick26", cargo: "Docente",},
    {id: "27", nombre: "Erick27", cargo: "Docente",},
    {id: "28", nombre: "Erick28", cargo: "Docente",},
    {id: "29", nombre: "Erick29", cargo: "Docente",},
    {id: "30", nombre: "Erick30", cargo: "Docente",},
  ];

  const estudiantes = [
    { id: "1", nombre: "Alejandro1", cargo: "Estudiante",},
    { id: "2", nombre: "Alejandro2", cargo: "Estudiante",},
    { id: "3", nombre: "Alejandro3", cargo: "Estudiante",},
    { id: "4", nombre: "Alejandro4", cargo: "Estudiante",},
    { id: "5", nombre: "Aleatorio1", cargo: "Estudiante",},
    { id: "6", nombre: "Aleatorio2", cargo: "Estudiante",},
    { id: "7", nombre: "Aleatorio3", cargo: "Estudiante",},
    { id: "8", nombre: "Aleatorio4", cargo: "Estudiante",},
    { id: "9", nombre: "Aleatorio5", cargo: "Estudiante",},
    { id: "10", nombre: "Aleatorio6", cargo: "Estudiante",},
    { id: "11", nombre: "Aleatorio7", cargo: "Estudiante",},
    { id: "12", nombre: "Aleatorio8", cargo: "Estudiante",},
    { id: "13", nombre: "Aleatorio9", cargo: "Estudiante",},
    { id: "14", nombre: "Aleatorio10", cargo: "Estudiante",},
    { id: "15", nombre: "Aleatorio11", cargo: "Estudiante",},
    { id: "16", nombre: "Aleatorio12", cargo: "Estudiante",},
    { id: "17", nombre: "Aleatorio13", cargo: "Estudiante",},
    { id: "18", nombre: "Aleatorio14", cargo: "Estudiante",},
    { id: "19", nombre: "Aleatorio15", cargo: "Estudiante",},
    { id: "20", nombre: "Aleatorio16", cargo: "Estudiante",},
    { id: "21", nombre: "Aleatorio17", cargo: "Estudiante",},
    { id: "22", nombre: "Aleatorio18", cargo: "Estudiante",},
    { id: "23", nombre: "Aleatorio19", cargo: "Estudiante",},
    { id: "24", nombre: "Aleatorio20", cargo: "Estudiante",},
    { id: "25", nombre: "Aleatorio21", cargo: "Estudiante",},
    { id: "26", nombre: "Aleatorio22", cargo: "Estudiante",},
    { id: "27", nombre: "Aleatorio23", cargo: "Estudiante",},
    { id: "28", nombre: "Aleatorio24", cargo: "Estudiante",},
    { id: "29", nombre: "Aleatorio25", cargo: "Estudiante",},
    { id: "30", nombre: "Aleatorio26", cargo: "Estudiante",},
  ];

  const handleCreateMesas = () => {
    const numMesas = cantidadMesas;
    const nuevasMesas = [];
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numMesas === 1) {
      nuevasMesas.push({
        id: 1,
        nombre: `Mesa 1`,
        rango: "A-Z",
        jurado: [],
      });
    } else if (numMesas > 1) {
      const letrasPorMesa = Math.ceil(letras.length / numMesas);

      for (let i = 0; i < numMesas; i++) {
        const rangoInicial = letras[i * letrasPorMesa];
        const rangoFinal =
          letras[(i + 1) * letrasPorMesa - 1] || letras[letras.length - 1];

        nuevasMesas.push({
          id: i + 1,
          nombre: `Mesa ${i + 1}`,
          rango: `${rangoInicial}-${rangoFinal}`,
          jurado: [],
        });
      }
    }

    asignarJurados(nuevasMesas);
  };

  function obtenerNombresJurados(list_mesas){
    const nombresJurados = list_mesas.flatMap((mesa) =>
      mesa.jurado.map((jurado) => `${jurado.nombre} ${jurado.cargo}`)
    );
    return(nombresJurados);
  }

  const asignarJurados = (nuevasMesas) => {
    const docentesCopy = [...docentes];
    const estudiantesCopy = [...estudiantes];

    const mesasConJurados = nuevasMesas.map((mesa) => {
      const juradosMesa = [];

      for (let i = 0; i < 2; i++) {
        if(i < 1){
          const randomIndex = Math.floor(Math.random() * docentesCopy.length);
          const docente = docentesCopy.splice(randomIndex, 1)[0];
          juradosMesa.push(docente);
        }else{
          const randomIndex = Math.floor(Math.random() * estudiantesCopy.length);
          const estudiante = estudiantesCopy.splice(randomIndex, 1)[0];
          juradosMesa.push(estudiante);
        }
      }

      return {
        ...mesa,
        jurado: juradosMesa,
      };
    });
    setMesas(mesasConJurados);
    console.log('Mesas jurado => ', mesasConJurados, 'Jurados => ', obtenerNombresJurados(mesasConJurados));
    console.log('Datos de formData => ', formData);
    const nombresjurados = obtenerNombresJurados(mesasConJurados);
    console.log(nombresjurados);
  };

  const handleCantidadMesasChange = (e) => {
    const selectedValue = parseInt(e.target.value, 10);
    setCantidadMesas(selectedValue);
  };

  const [carreras, setCarreras] = useState([]);

  const handleFacultadChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (value === "Facultad de veterinaria") {
      setCarreras(["Veterinaria "]);
    } else if (value === "Facultad de Ciencias y Tecnologia") {
      setCarreras([
        "Ing. Sistemas",
        "Ing. Electronica",
        "Ing. Eletrica",
        "Ing. Civil",
        "Ing. Industrial",
      ]);
    } else {
      setCarreras([]);
    }
  };

  const obtenerRango = (mesa) => {
    return mesa.rango;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
                  <InputLabel htmlFor="facultad">Facultad</InputLabel>
                  <Select
                    required
                    label="Facultad"
                    name="facultad"
                    value={formData.facultad}
                    onChange={handleFacultadChange}
                    inputProps={{
                      name: "facultad",
                      id: "facultad",
                    }}
                  >
                    <MenuItem value="Facultad de veterinaria">
                      Facultad de veterinaria
                    </MenuItem>
                    <MenuItem value="Facultad de Ciencias y Tecnologia">
                      Facultad de Ciencias y tecnologia
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mt: 2, marginBottom: 2 }}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="carrera">Carrera</InputLabel>
                  <Select
                    required
                    label="Carrera"
                    name="carrera"
                    value={formData.carrera}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        carrera: e.target.value,
                      });
                    }}
                    inputProps={{
                      name: "carrera",
                      id: "carrera",
                    }}
                  >
                    {carreras.map((carrera, index) => (
                      <MenuItem key={index} value={carrera}>
                        {carrera}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="cantidadMesas">
                      Cantidad de Mesas
                    </InputLabel>
                    <Select
                      required
                      label="Cantidad de Mesas"
                      name="cantidadMesas"
                      value={cantidadMesas}
                      onChange={handleCantidadMesasChange}
                      inputProps={{
                        name: "cantidadMesas",
                        id: "cantidadMesas",
                      }}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginLeft: 1 }}
                    onClick={handleCreateMesas}
                  >
                    <AddIcon />
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nombre de la Mesa</TableCell>
                    <TableCell>Rango</TableCell>
                    <TableCell>Jurado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mesas.map((mesa) => (
                    <TableRow key={mesa.id}>
                      <TableCell>{mesa.id}</TableCell>
                      <TableCell>{mesa.nombre}</TableCell>
                      <TableCell>{obtenerRango(mesa)}</TableCell>
                      <TableCell>
                        <CollapsibleTable jurados={mesa.jurado} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
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
              {edit ? "Editar Usuario" : "Crear Elección"}
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

const CollapsibleTable = ({ jurados }) => {
  const [open, setOpen] = useState(false);

  const handleCollapseClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button onClick={handleCollapseClick} sx={{ textTransform: "none" }}>
        {open ? "Ocultar Jurados" : `Mostrar Jurados (${jurados.length})`}
      </Button>
      <Collapse in={open}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Cargo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jurados.map((jurado, index) => (
              <TableRow key={index}>
                <TableCell>{jurado.nombre}</TableCell>
                <TableCell>{jurado.cargo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Collapse>
    </div>
  );
};

export default Form_Jurado;

Form_Jurado.propTypes = {
  edit: PropTypes.bool.isRequired,
  jurados: PropTypes.array.isRequired
};
