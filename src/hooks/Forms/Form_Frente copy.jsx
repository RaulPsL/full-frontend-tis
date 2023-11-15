import { useState } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  TextField,
  CssBaseline,
  Box,
  Button,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton, // Agregado
} from "@mui/material";
import { Label, Clear } from "@mui/icons-material"; // Agregado

const Form_Frente = ({ onClose, edit }) => {
  const [formData, setFormData] = useState({
    name: "",
    estado: "Activo",
    candidates: [],
  });

  const addCandidate = () => {
    const newCandidate = {
      name: "",
      cargo: "",
    };
    setFormData({
      ...formData,
      candidates: [...formData.candidates, newCandidate],
    });
  };

  const handleCandidateChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCandidates = [...formData.candidates];
    updatedCandidates[index][name] = value;

    setFormData({
      ...formData,
      candidates: updatedCandidates,
    });
  };

  const removeCandidate = (index) => {
    const updatedCandidates = [...formData.candidates];
    updatedCandidates.splice(index, 1); // Elimina el candidato en la posición 'index'
    setFormData({
      ...formData,
      candidates: updatedCandidates,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      onClose();
    } catch (error) {
      console.error("Error al enviar datos a la API:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "89vh",
        justifyContent: "space-between",
      }}
    >
      <CssBaseline />
      <Box>
        <FormControl
          sx={{
            width: 320,
          }}
        >
          <TextField
            required
            label="Nombre Frente"
            variant="outlined"
            fullWidth
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="dense"
          />
        </FormControl>
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
            onChange={(e) =>
              setFormData({ ...formData, estado: e.target.value })
            }
            label="Nombre"
          >
            <MenuItem value="Activo">Activo</MenuItem>
            <MenuItem value="Proceso">Proceso</MenuItem>
            <MenuItem value="Concluido">Concluido</MenuItem>
          </Select>
        </FormControl>
        {formData.candidates.map((candidate, index) => (
          <div key={index}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Candidato N°{index + 1}
              </Typography>
              <IconButton
                onClick={() => removeCandidate(index)}
                color="error"
                aria-label="Eliminar Candidato"
              >
                <Clear />
              </IconButton>
            </div>

            <FormControl
              sx={{
                width: 320,
                marginTop: "0px",
              }}
            >
              <TextField
                required
                label="Nombre del Candidato"
                variant="outlined"
                fullWidth
                name="name"
                value={candidate.name}
                onChange={(e) => handleCandidateChange(e, index)}
                margin="dense"
              />

              <Select
                required
                name="cargo"
                value={candidate.cargo}
                onChange={(e) => handleCandidateChange(e, index)}
              >
                <MenuItem value="Presidente">Presidente</MenuItem>
                <MenuItem value="Vicepresidente">Vicepresidente</MenuItem>
              </Select>
            </FormControl>
            {index < formData.candidates.length - 1 && (
              <hr style={{ margin: "20px 0" }} />
            )}
          </div>
        ))}

        <Button
          onClick={addCandidate}
          sx={{
            width: "100%",
            borderRadius: "55px",
            marginTop: "16px",
          }}
          variant="contained"
          color="primary"
        >
          Agregar Candidato
        </Button>
      </Box>
      <Box>
        <Button
          onClick={handleSubmit}
          sx={{
            width: "100%",
            borderRadius: "55px",
            marginTop: "16px",
          }}
          variant="contained"
          color="primary"
        >
          Crear Frente
        </Button>
      </Box>
    </Box>
  );
};

Form_Frente.propTypes = {
  onClose: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
};

export default Form_Frente;
