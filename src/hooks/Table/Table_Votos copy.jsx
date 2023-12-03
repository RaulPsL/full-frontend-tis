import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Table,
  TextField,
  Grid,
  Container,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SaveIcon from "@mui/icons-material/Save";
import { postApi, putApi } from "../../api/api";
import { Success } from "../Alerts/Success";
import { Danger } from "../Alerts/Danger";

const Table_Votos = ({
  votoss,
  convocatorias,
  nombre_convocatoria,
  jurados,
  fetchData,
}) => {
  const [votos, setVotos] = useState([...jurados]);
  const [expandedFacultades, setExpandedFacultades] = useState({});
  const [expandedCarreras, setExpandedCarreras] = useState({});
  const [textFieldValues, setTextFieldValues] = useState({});

  useEffect(() => {
    setVotos([...jurados]);
  }, [jurados]);

  const handleSave = async (id_mesa, votos, id_frente, id_conv) => {
    console.log("VOTOS", votos);
    try {
      const existingVote = votoss.find(
        (votosItem) =>
          votosItem.id_mesa === id_mesa &&
          votosItem.id_frente === id_frente &&
          votosItem.id_conv === id_conv
      );

      if (existingVote) {
        const updatedData = {
          id_mesa,
          votos,
          id_frente,
          id_conv,
        };

        console.log("Updating data:", updatedData);

        const response = await putApi(
          `votos`,
          `${existingVote.idResultados}`,
          updatedData
        );

        console.log("PUT Response:", response);
        Success.showSuccess("¡Se actualizo!");
        fetchData();
      } else {
        const newData = {
          id_mesa,
          votos,
          id_frente,
          id_conv,
        };

        console.log("Creating data:", newData);

        const response = await postApi("votos", newData);

        console.log("POST Response:", response);
        Success.showSuccess("¡Se guardo!");
        fetchData();
      }

      setMesaVotes((prevMesaVotes) => ({
        ...prevMesaVotes,
        [`${id_mesa}_${id_conv}`]: votos,
      }));
    } catch (error) {
      console.error("Error al guardar votos:", error);
      fetchData();
    }
  };

  const toggleFacultad = (facultadId) => {
    setExpandedFacultades((prev) => ({
      ...prev,
      [facultadId]: !prev[facultadId],
    }));
  };

  const toggleCarrera = (carreraId) => {
    setExpandedCarreras((prev) => ({ ...prev, [carreraId]: !prev[carreraId] }));
  };
  const handleTextFieldChange = (mesaKey, frenteId, nuevosVotos) => {
    setTextFieldValues((prevValues) => ({
      ...prevValues,
      [`${mesaKey}_Votos_${frenteId}`]: nuevosVotos,
    }));
  };

  return (
    <Container>
      {nombre_convocatoria !== "" &&
        convocatorias.map((convocatoria) => {
          if (convocatoria.NOMBRE_CONVOCATORIA === nombre_convocatoria) {
            return convocatoria.relacion_fc.map((relacion, keyFacultad) => (
              <Grid key={keyFacultad}>
                <Typography
                  variant="h5"
                  sx={{
                    borderBottom: "2px solid black",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    backgroundColor: expandedFacultades[
                      relacion.facultad.ID_FACULTAD
                    ]
                      ? "blue"
                      : "transparent",
                    color: expandedFacultades[relacion.facultad.ID_FACULTAD]
                      ? "white"
                      : "black",
                  }}
                  onClick={() => toggleFacultad(relacion.facultad.ID_FACULTAD)}
                >
                  <span>{relacion.facultad.NOMBRE_FACULTAD}</span>
                  <IconButton
                    sx={{
                      color: expandedFacultades[relacion.facultad.ID_FACULTAD]
                        ? "white"
                        : "blue",
                    }}
                  >
                    {expandedFacultades[relacion.facultad.ID_FACULTAD] ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </IconButton>
                </Typography>
                {expandedFacultades[relacion.facultad.ID_FACULTAD] && (
                  <Grid container spacing={2}>
                    {relacion.facultad.carrera.map((carrera, keyCarrera) => {
                      const carreraMesas = votos.filter(
                        (mesa) => carrera.ID_CARRERA === mesa.ID_CARRERA
                      );

                      let i = 1;

                      return (
                        <Grid
                          key={keyCarrera}
                          item
                          xs={12}
                          sx={{ marginLeft: "1px" }}
                        >
                          <Card item xs={12} sm={6} md={3}>
                            <Typography
                              variant="h7"
                              sx={{
                                borderBottom: "2px solid black",
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                textDecoration: "none",
                                cursor: "pointer",
                                backgroundColor: expandedCarreras[
                                  carrera.ID_CARRERA
                                ]
                                  ? "#275AD3"
                                  : "transparent",
                                color: expandedCarreras[carrera.ID_CARRERA]
                                  ? "white"
                                  : "black",
                              }}
                              onClick={() => toggleCarrera(carrera.ID_CARRERA)}
                            >
                              <span>{carrera.NOMBRE_CARRERA}</span>
                              <IconButton
                                sx={{
                                  color: expandedCarreras[carrera.ID_CARRERA]
                                    ? "white"
                                    : "blue",
                                }}
                              >
                                {expandedCarreras[carrera.ID_CARRERA] ? (
                                  <ExpandLessIcon />
                                ) : (
                                  <ExpandMoreIcon />
                                )}
                              </IconButton>
                            </Typography>

                            {expandedCarreras[carrera.ID_CARRERA] && (
                              <TableContainer>
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Mesa</TableCell>
                                      <TableCell>Rango de Apellidos</TableCell>
                                      {convocatoria.relacion_conv_frente.map(
                                        (relacionFrente) => (
                                          <TableCell
                                            key={relacionFrente.ID_FRENTE}
                                          >
                                            {relacionFrente.NOMBRE_FRENTE}
                                          </TableCell>
                                        )
                                      )}
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {carreraMesas.map((mesa) => {
                                      const idMesa = mesa.ID_MESA;
                                      const mesaKey = `${idMesa}_${convocatoria.ID_CONVOCATORIA}`;
                                      const textFieldId = `Votos_${mesaKey}`;

                                      return (
                                        <TableRow key={idMesa}>
                                          <TableCell>
                                            <Typography
                                              variant="h7"
                                              sx={{ width: "20%" }}
                                            >
                                              {`Mesa ${i++}`}
                                            </Typography>
                                          </TableCell>
                                          <TableCell>
                                            <Typography
                                              variant="h7"
                                              sx={{ width: "20%" }}
                                            >
                                              {mesa.RANGO_APELLIDOS}
                                            </Typography>
                                          </TableCell>
                                          {convocatoria.relacion_conv_frente.map(
                                            (relacionFrente) => (
                                              <TableCell
                                                key={relacionFrente.ID_FRENTE}
                                              >
                                                <TextField
                                                  error={
                                                    textFieldValues[
                                                      `${mesaKey}_Votos_${relacionFrente.ID_FRENTE}`
                                                    ] !== undefined &&
                                                    parseInt(
                                                      textFieldValues[
                                                        `${mesaKey}_Votos_${relacionFrente.ID_FRENTE}`
                                                      ]
                                                    ) !==
                                                      votoss.find(
                                                        (votosItem) =>
                                                          votosItem.id_mesa ===
                                                            mesa.ID_MESA &&
                                                          votosItem.id_frente ===
                                                            relacionFrente.ID_FRENTE
                                                      )?.votos
                                                  }
                                                  helperText={
                                                    textFieldValues[
                                                      `${mesaKey}_Votos_${relacionFrente.ID_FRENTE}`
                                                    ] !== undefined &&
                                                    parseInt(
                                                      textFieldValues[
                                                        `${mesaKey}_Votos_${relacionFrente.ID_FRENTE}`
                                                      ]
                                                    ) !==
                                                      votoss.find(
                                                        (votosItem) =>
                                                          votosItem.id_mesa ===
                                                            mesa.ID_MESA &&
                                                          votosItem.id_frente ===
                                                            relacionFrente.ID_FRENTE
                                                      )?.votos
                                                      ? "Guardar Cambios"
                                                      : ""
                                                  }
                                                  id={`Votos_${mesaKey}_Votos_${relacionFrente.ID_FRENTE}`}
                                                  label="Votos"
                                                  type="number"
                                                  value={
                                                    textFieldValues[
                                                      `${mesaKey}_Votos_${relacionFrente.ID_FRENTE}`
                                                    ] !== undefined
                                                      ? textFieldValues[
                                                          `${mesaKey}_Votos_${relacionFrente.ID_FRENTE}`
                                                        ]
                                                      : votoss.find(
                                                          (votosItem) =>
                                                            votosItem.id_mesa ===
                                                              mesa.ID_MESA &&
                                                            votosItem.id_frente ===
                                                              relacionFrente.ID_FRENTE
                                                        )?.votos || ""
                                                  }
                                                  onChange={(event) => {
                                                    const nuevosVotos =
                                                      event.target.value;
                                                    handleTextFieldChange(
                                                      mesaKey,
                                                      relacionFrente.ID_FRENTE,
                                                      nuevosVotos
                                                    );
                                                  }}
                                                />

                                                <IconButton
                                                  onClick={() => {
                                                    const nuevosVotos =
                                                      parseInt(
                                                        textFieldValues[
                                                          `${mesaKey}_Votos_${relacionFrente.ID_FRENTE}`
                                                        ]
                                                      );
                                                    handleSave(
                                                      idMesa,
                                                      nuevosVotos,
                                                      relacionFrente.ID_FRENTE,
                                                      convocatoria.ID_CONVOCATORIA
                                                    );
                                                  }}
                                                  sx={{ color: "green" }}
                                                >
                                                  <SaveIcon />
                                                </IconButton>
                                              </TableCell>
                                            )
                                          )}
                                        </TableRow>
                                      );
                                    })}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            )}
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                )}
              </Grid>
            ));
          }
          return null;
        })}
    </Container>
  );
};

export default Table_Votos;
