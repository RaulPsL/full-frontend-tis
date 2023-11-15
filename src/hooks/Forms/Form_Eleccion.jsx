import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TextField,
  IconButton,
  Box,
  Grid,
  Autocomplete,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { getApiConv, getApiFrente, getApiUsuarios, postCandidatos, putApiUsuarioCand } from "../../api/api";
function FormEleccion() {
  const [frente, setFrente] = useState("");
  const [frentes, setFrentes] = useState([]);
  const [convocatorias, setConvocatorias] = useState([]);
  const [candidatos, setCandidatos] = useState([]);
  const [formData, setFormData] = useState({});
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedNombre, setEditedNombre] = useState("");
  const [editedCargo, setEditedCargo] = useState("");
  const [convocatoria, setConvocatoria] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [id_usuario, setIdUsuario] = useState(0);
  const [list_candidato, setList_Candidato] = useState([]);
  let i = 0;

  const handleChangeFrente = (event) => {
    setFrente(event.target.value);
  };

  const handleAgregarCandidato = () => {
    let intervalId;
    intervalId = setInterval(()=>{
      buscarIdUsuario(formData.nombreCandidato, intervalId);
    }, 1000);
    
    const nuevoCandidato = {
      ID_USUARIO: id_usuario,
      ID_FRENTE: buscarIdFrente(frente),
      CARGO: formData.cargoCandidato,
      relacion_elecc_frente:{
        ID_FRENTE:'ID_FRENTE',
        ID_ELECCION:buscarIdEleccion(formData.tipoEleccion),
      }
    };
    const nuevo_candidato = {
      nombre_candidato: formData.nombreCandidato,
      cargoCandidato: formData.cargoCandidato,
    };
    console.log(nuevo_candidato);
    setList_Candidato([...list_candidato, nuevo_candidato]);
    setCandidatos([...candidatos, nuevoCandidato]);
    console.log(list_candidato);
    console.log(nuevoCandidato);
    setFormData({
      ...formData,
      cargoCandidato: "Decano",
      
    })
  };
  const handleConvocatoriaChange = (event) => {
    setConvocatoria(event.target.value);
  };

  const handleNombreCandidatoChange = (event) => {
    setFormData({ ...formData, nombreCandidato: event.target.value });
  };

  const handleCargoCandidatoChange = (event) => {
    setFormData({ ...formData, cargoCandidato: event.target.value });
  };

  const handleEditarCandidato = (index) => {
    setEditingIndex(index);
    setEditedNombre(candidatos[index].nombre);
    setEditedCargo(candidatos[index].cargo);
  };

  const handleGuardarEdicion = () => {
    if (editingIndex !== -1) {
      const candidatosActualizados = [...candidatos];
      candidatosActualizados[editingIndex].nombre = editedNombre;
      candidatosActualizados[editingIndex].cargo = editedCargo;
      setCandidatos(candidatosActualizados);
      setEditingIndex(-1);
    }
  };

  const handleCancelarEdicion = () => {
    setEditingIndex(-1);
  };

  const handleEliminarCandidato = (index) => {
    const candidatosActualizados = [...candidatos];
    candidatosActualizados.splice(index, 1);
    setCandidatos(candidatosActualizados);
  };

  //Aun no se esta ejecutando
  const handleSubmit = () => {
    candidatos.shift();
    const temp = JSON.stringify(candidatos);
    postCandidatos('', temp);
  };

  const buscarIdUsuario = (param, interval) => {
    const usuario_select = usuarios.map((usuario)=>{return `${usuario.NOMBRE_USUARIO} ${usuario.APELLIDO_USUARIO}`;}).
                                    find((item) => item === param).split(' ');
    if(usuario_select !== null){
      clearInterval(interval);
      const datos_usuario = {
        NOMBRE_USUARIO : usuario_select[0],
        APELLIDO_USUARIO : usuario_select.slice(1).join(" "),
      }
      const fetchData = async () => {
        try {
          const result = await putApiUsuarioCand(datos_usuario);
          setIdUsuario(result[0].ID_USUARIO);
        } catch (error) {
          console.log('Error fetching data: ', error);
        }
      }
      fetchData();
    }
  }
  const buscarIdFrente = (param) => {
    const frente_select = frentes.find((item) => item.NOMBRE_FRENTE === param);
    return frente_select ? frente_select.ID_FRENTE : 0;
  }
  const buscarIdEleccion = (param) => {
    const eleccion_select = convocatorias.find((item) => item.NOMBRE_ELECCION === param);
    return eleccion_select ? eleccion_select.ID_ELECCION : 0;
  }

  function nuevo_arreglo_con_nombres(array) {
    return array.map((usuario)=>{return {
                                  "ID_USUARIO": usuario.ID_USUARIO,
                                  "NOMBRE_USUARIO":`${usuario.NOMBRE_USUARIO} ${usuario.APELLIDO_USUARIO}`,
                                  "CI_USUARIO":usuario.CI_USUARIO,
                                  "cargo":usuario.cargo,
                                  "relacion_uc":usuario.relacion_uc};});
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await getApiConv();
        setConvocatorias(result);
        result = await getApiFrente();
        setFrentes(result);
        console.log(frentes);
        result = await getApiUsuarios();
        setUsuarios(result);
        setUsuarios(nuevo_arreglo_con_nombres(usuarios));
        console.log(convocatorias);
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    }
    fetchData();
  },[]);

  return (
    <Box sx={{ marginTop: "15px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="frente-select">Convocatoria</InputLabel>
            <Select
              value={convocatoria}
              label="Seleccionar Convocatoria"
              id="frente-select"
              onChange={handleConvocatoriaChange}
            >
              { convocatorias.map((convocatoria, index) => {
                
                console.log("Convocatoria => "+String(i+1)+" ", convocatoria);
                return <MenuItem key={index} value={convocatoria.NOMBRE_CONVOCATORIA}>
                            {convocatoria.NOMBRE_CONVOCATORIA}
                        </MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <TextField
            id="Facultad"
            label={ 
              convocatoria !== "" ? 
              convocatorias.map(
                (convo) => {
                  if(convo.NOMBRE_CONVOCATORIA.toUpperCase() === convocatoria.toUpperCase()){
                    return /*convo.relacion_fc.map((facultad, facKey) => (facultad.NOMBRE_FACULTAD))*/ "Faultades";
                  }
                }
              ):'Facultad' }
              variant="outlined"
              onChange={(e) =>
                setFormData({ ...formData, Facultad: e.target.value })
              }
              disabled
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            id="TipoEleccion"
            label={ convocatoria !== "" ? convocatorias.find((convo) => convo.NOMBRE_CONVOCATORIA == convocatoria).relacion_elecc_conv.TIPO_ELECCION:'Tipo Eleccion' }
            variant="outlined"
            value={formData.TipoEleccion}
            onChange={(e) =>
              setFormData({ ...formData, TipoEleccion: e.target.value })
            }
            disabled
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            id="DiaEleccion"
            label={ 
                convocatoria !== "" ? 
                  String(convocatorias.find((convo) => convo.NOMBRE_CONVOCATORIA == convocatoria).DIA_ELECCION).split(' ')[0]:'Dia Eleccion' }
            variant="outlined"
            value={formData.TipoEleccion}
            onChange={(e) =>
              setFormData({ ...formData, TipoEleccion: e.target.value })
            }
            disabled
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="cargo-candidato">Frente</InputLabel>
            <Select
              value={formData.nombreFrente}
              onChange={handleChangeFrente}
              label="Cargo"
              id="cargo-candidato"
            >
              {frentes.map((frente, index) => {
                if(frente.ACTIVO !== null){
                  if(frente.ACTIVO.toUpperCase() === 'ACTIVO'){
                    return (
                            <MenuItem key={index} value={frente.NOMBRE_FRENTE}>
                              {frente.NOMBRE_FRENTE}
                            </MenuItem>
                          )
                  }
                }
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <div>
            <h2>Agregar Candidato</h2>
            <FormControl fullWidth variant="outlined">
              <Autocomplete
                id={`nuevo-usuario-autocomplete-${usuarios}`}
                options={usuarios}
                //value={nuevoUsuario}
                //onChange={(event, newValue) => setNuevoUsuario(newValue)}
                getOptionLabel={(usuario) => usuario.NOMBRE_USUARIO}
                renderInput={(params) => (
                  <TextField {...params} label="Nuevo Usuario" fullWidth />
                )}
              />
            </FormControl>

            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="cargo-candidato">Cargo</InputLabel>
              <Select
                value={formData.cargoCandidato}
                onChange={handleCargoCandidatoChange}
                label="Cargo"
                id="cargo-candidato"
              >
                <MenuItem value="Decano">Decano</MenuItem>
                <MenuItem value="Rector">Rector</MenuItem>
                <MenuItem value="Consejero">Consejero</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              onClick={handleAgregarCandidato}
            >
              Agregar Candidato
            </Button>
          </div>
        </Grid>

        <Grid item xs={12}>
          <h2>Candidatos del Frente: {frente}</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Cargo</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list_candidato.map((candidato, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {editingIndex === index ? (
                        <TextField
                          value={editedNombre}
                          onChange={(e) => setEditedNombre(e.target.value)}
                        />
                      ) : (
                        candidato.nombre_candidato
                      )}
                    </TableCell>
                    <TableCell>
                      {editingIndex === index ? (
                        <FormControl fullWidth variant="outlined">
                          <Select
                            value={editedCargo}
                            onChange={(e) => setEditedCargo(e.target.value)}
                          >
                            <MenuItem value="Decano">Decano</MenuItem>
                            <MenuItem value="Rector">Rector</MenuItem>
                            <MenuItem value="Consejero">Consejero</MenuItem>
                          </Select>
                        </FormControl>
                      ) : (
                        candidato.cargoCandidato
                      )}
                    </TableCell>
                    <TableCell>
                      {editingIndex === index ? (
                        <div>
                          <IconButton
                            aria-label="Guardar"
                            color="primary"
                            onClick={handleGuardarEdicion}
                          >
                            <SaveIcon />
                          </IconButton>
                          <IconButton
                            aria-label="Cancelar"
                            color="secondary"
                            onClick={handleCancelarEdicion}
                          >
                            <CancelIcon />
                          </IconButton>
                        </div>
                      ) : (
                        <div>
                          <IconButton
                            aria-label="Editar"
                            color="primary"
                            onClick={() => handleEditarCandidato(index)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="Eliminar"
                            color="secondary"
                            onClick={() => handleEliminarCandidato(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Button onClick={handleSubmit}>Enviar</Button>
    </Box>
  );
}

export default FormEleccion;
