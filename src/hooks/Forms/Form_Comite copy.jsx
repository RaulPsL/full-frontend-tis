import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardHeader,
  ListItem,
  ListItemText,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function shuffle(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

const FormComite = () => {
  const [selectedFacultad, setSelectedFacultad] = useState("");

  const convocatoria = {
    tipoEleccion: "Elección 2023",
    convocatorias: [
      {
        nombre: "Convocatoria 1",
        facultad: "Facultad 1",
        carreras: ["Carrera 1.1", "Carrera 1.2", "Carrera 1.3"],
      },
      {
        nombre: "Convocatoria 2",
        facultad: "Facultad 2",
        carreras: ["Carrera 2.1", "Carrera 2.2", "Carrera 2.3"],
      },
      {
        nombre: "Convocatoria 3",
        facultad: "Facultad 3",
        carreras: ["Carrera 3.1", "Carrera 3.2", "Carrera 3.3"],
      },
      {
        nombre: "Convocatoria 4",
        facultad: "Facultad 4",
        carreras: ["Carrera 4.1", "Carrera 4.2", "Carrera 4.3"],
      },
    ],
  };

  const docentes = shuffle([
    {
      id: "1",
      nombre: "Erick1",
      cargo: "Docente",
    },
    {
      id: "2",
      nombre: "Erick2",
      cargo: "Docente",
    },
    {
      id: "3",
      nombre: "Erick3",
      cargo: "Docente",
    },
    {
      id: "4",
      nombre: "Erick4",
      cargo: "Docente",
    },
    {
      id: "5",
      nombre: "Erick5",
      cargo: "Docente",
    },
    {
      id: "6",
      nombre: "Erick6",
      cargo: "Docente",
    },
  ]).slice(0, 6);

  const estudiantes = shuffle([
    {
      id: "7",
      nombre: "Alejandro1",
      cargo: "Estudiante",
    },
    {
      id: "8",
      nombre: "Alejandro2",
      cargo: "Estudiante",
    },
    {
      id: "9",
      nombre: "Alejandro3",
      cargo: "Estudiante",
    },
    {
      id: "10",
      nombre: "Alejandro4",
      cargo: "Estudiante",
    },
  ]).slice(0, 4);

  const handleFacultadChange = (event) => {
    const facultadIndex = event.target.value;
    setSelectedFacultad(facultadIndex);
  };

  const renderVocalesYEstudiantes = (vocales, estudiantes) => {
    const docentesTitulares = docentes.slice(0, 3);
    const docentesSuplentes = docentes.slice(3);

    const titulares = [...docentesTitulares, ...estudiantes.slice(0, 2)];

    const suplentes = [...docentesSuplentes, ...estudiantes.slice(2)];

    const combinedData = [...titulares, ...suplentes];

    return (
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>N°</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Cargo</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {combinedData.map((person, index) => (
              <TableRow key={person.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{person.nombre}</TableCell>
                <TableCell>{person.cargo}</TableCell>
                <TableCell>
                  {index < 5 ? "Vocal Titular" : "Vocal Suplente"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div>
      <FormControl fullWidth variant="outlined" sx={{ marginTop: "15px" }}>
        <InputLabel htmlFor="facultad-select">
          Seleccionar Convocatoria
        </InputLabel>
        <Select
          required
          label="Seleccionar Convocatoria"
          name="facultad-select"
          id="facultad-select"
          value={selectedFacultad}
          onChange={handleFacultadChange}
        >
          <MenuItem value="">Seleccionar Convocatoria</MenuItem>
          {convocatoria.convocatorias.map((convocatoria, index) => (
            <MenuItem key={index} value={index}>
              {convocatoria.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={2}>
        {selectedFacultad !== "" &&
          convocatoria.convocatorias.map((convocatoria, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Card>
                <CardHeader title={convocatoria.facultad} />
                <CardContent>
                  <h3>Carreras de la Facultad</h3>
                  <Divider />
                  {convocatoria.carreras.map((carrera, carreraIndex) => (
                    <ListItem key={carreraIndex}>
                      <Grid item xs={12} sm={12} md={12} key={index}>
                        <Card>
                          <CardContent>
                            <ListItemText primary={carrera} />
                            <Divider />
                            {renderVocalesYEstudiantes(docentes, estudiantes)}
                          </CardContent>
                        </Card>
                      </Grid>
                    </ListItem>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default FormComite;
