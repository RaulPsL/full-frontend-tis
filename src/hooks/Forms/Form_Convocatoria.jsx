import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  CssBaseline,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import PlusOneRoundedIcon from "@mui/icons-material/PlusOneRounded";
import { getApiConv, getApiFac, postConv } from "../../api/api";

const Form_Convocatoria = ({ onClose, edit }) => {
  const [formData, setFormData] = useState({
    name: "",
    dateB: null,
    dateE: null,
    facultad: "",
    tipo: "",
    estado: "Activo",
    relacion_fc:{}
  });

  const [requerimientos, setRequerimientos] = useState([]);

  const [facultades, setfacultades] = useState([]);

  const [elecciones, setelecciones] = useState([]);

  const [selectedFacultad, setSelectedFacultad] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [selectedCarrera, setSelectedCarrera] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "facultad") {
      setSelectedFacultad(value);
      setSelectedCarrera("");
    }
    if (name === "carrera") {
      setSelectedCarrera(value);
    }
  };

  const handleAgregarRequerimiento = () => {
    if (formData.nuevoRequerimiento) {
      setRequerimientos([...requerimientos, formData.nuevoRequerimiento]);
      setFormData({
        ...formData,
        nuevoRequerimiento: "",
      });
    }
  };

  const handleEliminarRequerimiento = (index) => {
    const updatedRequerimientos = requerimientos.filter((_, i) => i !== index);
    setRequerimientos(updatedRequerimientos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Preparar los datos que deseas enviar al backend
      const dataToSend = {
        ID_ELECCION : buscarIDE(formData.tipo),
        FECHA_INI : formData.dateB,
        FECHA_FIN : formData.dateE,
        DIA_ELECCION : formData.dateB,
        NOMBRE_CONVOCATORIA : formData.tipo.toUpperCase()+' '+formData.facultad,
        ACTIVO : formData.estado,
        URL_PDF_CONVOCATORIA : 'https://ejemplo.com/convocatoria.pdf',
        relacion_fc : {
          ID_FACULTAD: buscarIDF(formData.facultad),
          ID_CONVOCATORIA: 'ID_CONVOCATORIA'
        }
      };
      const value = JSON.stringify(dataToSend);
      console.log(value);
      postConv('', value);
      onClose(); // Cerrar el formulario después de enviar los datos
    } catch (error) {
      console.error("Error sending data to API:", error);
    }
  };

  const buscarIDE = (param) => {
    const eleccion_encontrada = elecciones.find((item) => item.TIPO_ELECCION === param);
      return eleccion_encontrada ? eleccion_encontrada.ID_ELECCION : null;
  }

  const buscarIDF = (param) => {
    const facultad_encontrada = facultades.find((item) => item.NOMBRE_FACULTAD === param);
    return facultad_encontrada ? facultad_encontrada.ID_FACULTAD : null;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await getApiFac();
        setfacultades(result);
        result = await getApiConv();
        setelecciones(result);
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    }
    fetchData();
  }, []);

  console.log(elecciones);
  const tiposEleccion = elecciones.map((eleccion)=>(eleccion.TIPO_ELECCION));
  const handleDateRangeChange = (newDateRange) => {
    setFormData({
      ...formData,
      dateB: cambiar_date(newDateRange[0]), // Guardamos la cadena de fecha directamente
      dateE: cambiar_date(newDateRange[1]), // Guardamos la cadena de fecha directamente
    });
  };

  const cambiar_date = (param)=> {
    const date = new Date(param);
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDay()).padStart(2,'0')}`;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "89vh",
      }}
    >
      <CssBaseline />
      <form onSubmit={handleSubmit}>
        <FormControl
          sx={{
            width: 320,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FormControl fullWidth variant="outlined" sx={{ flexGrow: 1 }}>
              <InputLabel htmlFor="tipo_eleccion">Tipo de elección</InputLabel>
              <Select
                required
                label="Tipo de elección"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                inputProps={{
                  name: "tipo",
                  id: "tipo_eleccion",
                }}
              >
                {tiposEleccion.map((tipo, index) => (
                  <MenuItem key={index} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              onClick={handleAgregarRequerimiento}
              variant="contained"
              color="primary"
              sx={{ ml: 1 }}
            >
              <AddCircleRoundedIcon />
            </Button>
          </Box>
          <FormControl
            sx={{
              width: 320,
              marginTop: "10px",
            }}
          >
            <InputLabel htmlFor="estado">Estado</InputLabel>
            <Select
              required
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              label="Nombre"
            >
              <MenuItem value="Activo">Activo</MenuItem>
              <MenuItem value="Inactivo">Inactivo</MenuItem>
            </Select>
          </FormControl>
          <Box>
            <Typography align="center">Documentacion</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateRangePicker"]}>
                <DateRangePicker
                  localeText={{ start: "Fecha inicio", end: "Fecha fin" }}
                  onChange={handleDateRangeChange}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Dia de la Eleccion" />
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="facultad">Facultad</InputLabel>
              <Select
                required
                label="Facultad"
                name="facultad"
                value={formData.facultad}
                onChange={handleChange}
                inputProps={{
                  name: "facultad",
                  id: "facultad",
                }}
              >
                {facultades.map((facultad) => (
                  <MenuItem key={facultad.NOMBRE_FACULTAD} value={facultad.NOMBRE_FACULTAD}>
                    {facultad.NOMBRE_FACULTAD}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <Typography align="center">Requerimientos</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                label="Nuevo Requerimiento"
                name="nuevoRequerimiento"
                value={formData.nuevoRequerimiento || ""}
                onChange={handleChange}
                multiline
                fullWidth
              />
              <Button
                onClick={handleAgregarRequerimiento}
                variant="contained"
                color="primary"
                sx={{ ml: 2 }}
              >
                <PlusOneRoundedIcon />
              </Button>
            </Box>
            {requerimientos.length > 0 && (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Requerimiento</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requerimientos.map((requerimiento, index) => (
                      <TableRow key={index}>
                        <TableCell>{requerimiento}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleEliminarRequerimiento(index)}
                          >
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </FormControl>

        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            sx={{
              width: "100%",
              borderRadius: "55px",
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.9)",
            }}
            variant="solid"
            color="primary"
          >
            {edit ? "Editar Convocatoria" : "Crear Convocatoria"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Form_Convocatoria;

Form_Convocatoria.propTypes = {
  onClose: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
};
