import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteMiembro, getApiConv, getApiDocentes, postMiembro, putEditMiembro } from "../../api/api";

const FormComite = () => {
  const [selectedConvocatoria, setSelectedConvocatoria] = useState("");
  const [nuevoUsuario, setNuevoUsuario] = useState(null);
  const [usuariosAgregados, setUsuariosAgregados] = useState({});
  const [usuarios, setusuarios] = useState([]);
  const [id_convocatoria, setId_Convocatoria] = useState(0);
  const [id_usuario, setId_usuario] = useState(0);
  const [convocatorias, setConvocatorias] = useState([]);

  const handleAddUser = (facultad, newUser) => {
    let result = usuarios.find((usuario) => usuario.NOMBRE_USUARIO === newUser.NOMBRE_USUARIO).ID_USUARIO;
    setId_usuario(result);
    result = convocatorias.find((convocatoria) => convocatoria.NOMBRE_CONVOCATORIA === selectedConvocatoria).ID_CONVOCATORIA;
    setId_Convocatoria(result);

    console.log(usuariosAgregados);
    console.log(newUser);
    const userWithDefaultEstado = { ...newUser, ESTADO: "Vocal Titular" };

    setUsuariosAgregados((prevUsers) => {
      const updatedUsers = { ...prevUsers };
      updatedUsers[facultad] = [
        ...(prevUsers[facultad] || []),
        userWithDefaultEstado,
      ];
      return updatedUsers;
    });
    setNuevoUsuario(null);
    const data = JSON.stringify({
      ID_USUARIO:id_usuario,
      ID_CONVOCATORIA:id_convocatoria,
      ESTADO: userWithDefaultEstado.ESTADO
    });
    console.log(data);
    postMiembro('', data);
  };

  const handleDeleteUser = (facultad, userName) => {
    setUsuariosAgregados((prevUsers) => {
      const updatedUsers = { ...prevUsers };
      updatedUsers[facultad] = updatedUsers[facultad].filter(
        (user) => user.nombre !== userName
      );
      return updatedUsers;
    });

    let result = usuarios.find((usuario) => usuario.NOMBRE_USUARIO === userName).ID_USUARIO;
    deleteMiembro(result);
  };

  const [editState, setEditState] = useState({});
  const [editedUser, setEditedUser] = useState(null);

  const handleConvocatoriaChange = (event) => {
    setusuarios(nuevo_arreglo_con_nombres(usuarios));
    setSelectedConvocatoria(event.target.value);
    setUsuariosAgregados({});
    setNuevoUsuario(null);
    if(selectedConvocatoria !== ""){
      let result = convocatorias.find((convocatoria) => convocatoria.NOMBRE_CONVOCATORIA === event.target.value).ID_CONVOCATORIA
      setId_Convocatoria(result);
    }
  };

  const handleEdit = (facultad, userName) => {
    setEditState((prevEditState) => {
      const newEditState = { ...prevEditState };
      newEditState[facultad] = userName;
      return newEditState;
    });

    const facultyUsers = usuariosAgregados[facultad] || [];
    const userToEdit = facultyUsers.find((user) => user.NOMBRE_USUARIO === userName);

    setEditedUser({ ...userToEdit });
  };

  const handleSave = (facultad, oldName) => {
    setEditState((prevEditState) => {
      const newEditState = { ...prevEditState };
      delete newEditState[facultad];
      return newEditState;
    });

    const facultyUsers = usuariosAgregados[facultad] || [];
    const editedIndex = facultyUsers.findIndex(
      (user) => user.NOMBRE_USUARIO === oldName
    );

    if (editedIndex !== -1) {
      facultyUsers[editedIndex] = editedUser;
      facultyUsers[editedIndex].NOMBRE_USUARIO = editedUser.NOMBRE_USUARIO;
      facultyUsers[editedIndex].ESTADO = editedUser.ESTADO;
    }
    setEditedUser(null);
    let result = usuarios.find((usuario) => usuario.NOMBRE_USUARIO === oldName).ID_USUARIO;
    let data = JSON.stringify({
      ID_USUARIO:id_usuario,
      ID_CONVOCATORIA:id_convocatoria,
      ESTADO: editedUser.ESTADO
    });
    putEditMiembro('', result, data);
  };

  const handleCancel = (facultad) => {
    setEditState((prevEditState) => {
      const newEditState = { ...prevEditState };
      delete newEditState[facultad];
      return newEditState;
    });
  };

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
        console.log(convocatorias);
        result = await getApiDocentes();
        result = nuevo_arreglo_con_nombres(result);
        setusuarios(result);
        console.log(usuarios);
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    }
    fetchData();
  },[]);

  const renderFacultadTable = (facultad) => {
    const addedUsers = usuariosAgregados[facultad] || [];
    return (
      <Grid item xs={12} sm={12} md={12} key={facultad}>
        <Card>
          <CardHeader title={facultad} />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <Autocomplete
                  id={`nuevo-usuario-autocomplete-${facultad}`}
                  options={usuarios}
                  value={nuevoUsuario}
                  onChange={(event, newValue) => setNuevoUsuario(newValue)}
                  getOptionLabel={(usuario) => usuario.NOMBRE_USUARIO}
                  renderInput={(params) => (
                    <TextField {...params} label="Nuevo Usuario" fullWidth />
                  )}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleAddUser(facultad, nuevoUsuario)}
                >
                  +
                </Button>
              </Grid>
            </Grid>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>N°</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Cargo</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addedUsers.map((user, userIndex) => (
                    <TableRow key={userIndex}>
                      <TableCell>{userIndex + 1}</TableCell>
                      <TableCell>
                        {editState[facultad] === user.NOMBRE_USUARIO ? (
                          <Autocomplete
                            id={`nuevo-usuario-autocomplete-${facultad}`}
                            options={usuarios}
                            value={editedUser}
                            onChange={(event, newValue) =>
                              setEditedUser(newValue)
                            }
                            getOptionLabel={(usuario) => usuario.NOMBRE_USUARIO}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Nuevo Usuario"
                                fullWidth
                              />
                            )}
                          />
                        ) : (
                          user.NOMBRE_USUARIO
                        )}
                      </TableCell>
                      <TableCell>{user.cargo.NOMBRE_CARGO}</TableCell>
                      <TableCell>
                        {editState[facultad] === user.nombre ? (
                          <Select
                            value={ editedUser !== null ? editedUser.estado || "Titular": "False"}
                            onChange={(e) => {
                              setEditedUser((prevState) => ({
                                ...prevState,
                                ESTADO: e.target.value,
                              }));
                            }}
                          >
                            <MenuItem value="Vocal titular">
                              Vocal Titular
                            </MenuItem>
                            <MenuItem value="Vocal suplente">
                              Vocal Suplente
                            </MenuItem>
                          </Select>
                        ) : (
                          user.estado
                        )}
                      </TableCell>
                      <TableCell>
                        {editState[facultad] === user.NOMBRE_USUARIO ? (
                          <div>
                            <IconButton color="primary">
                              <SaveIcon
                                onClick={() =>
                                  handleSave(facultad, user.NOMBRE_USUARIO)
                                }
                              />
                            </IconButton>
                            <IconButton color="secondary">
                              <CancelIcon
                                onClick={() =>
                                  handleCancel(facultad, user.NOMBRE_USUARIO)
                                }
                              />
                            </IconButton>
                          </div>
                        ) : (
                          <IconButton color="primary">
                            <EditIcon
                              onClick={() => handleEdit(facultad, user.NOMBRE_USUARIO)}
                            />
                          </IconButton>
                        )}
                        <IconButton
                          color="secondary"
                          onClick={() =>
                            handleDeleteUser(facultad, user.NOMBRE_USUARIO)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  const renderFacultadTables = () => {
    if (selectedConvocatoria === "") {
      return null;
    }
    const facultades = convocatorias.find(
      (convocatoria) => convocatoria.NOMBRE_CONVOCATORIA === selectedConvocatoria
      ).relacion_fc;

    return (
      <Grid container spacing={2}>
        {facultades.map((facultad) => renderFacultadTable(facultad.facultad.NOMBRE_FACULTAD))}
      </Grid>
    );
  };

  return (
    <div>
      <FormControl fullWidth variant="outlined" sx={{ marginTop: "15px" }}>
        <InputLabel htmlFor="convocatoria-select">
          Seleccionar Convocatoria
        </InputLabel>
        <Select
          required
          label="Seleccionar Convocatoria"
          name="convocatoria-select"
          id="convocatoria-select"
          value={selectedConvocatoria}
          onChange={handleConvocatoriaChange}
        >
          <MenuItem value="">Seleccionar Convocatoria</MenuItem>
          {convocatorias.map((convocatoria, index) => {
            if(convocatoria.ACTIVO.toUpperCase() !== "INACTIVO"){
                return <MenuItem key={index} value={convocatoria.NOMBRE_CONVOCATORIA}>
                        {convocatoria.NOMBRE_CONVOCATORIA}
                       </MenuItem>
          }})}
        </Select>
      </FormControl>
      {renderFacultadTables()}
    </div>
  );
};

export default FormComite;