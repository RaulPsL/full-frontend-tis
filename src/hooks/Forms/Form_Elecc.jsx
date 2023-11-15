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
} from "@mui/material";

import { postFrente } from "../../api/api";

const Form_Elecc = ({ onClose, edit }) => {
  const [formData, setFormData] = useState({
    name: "",
    estado: "Activo", // Set "Activo" as the default estado
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = {
        name: formData.name,
        estado: formData.estado,
      };

      const jsonData = JSON.stringify(dataToSend);
      postFrente('', jsonData);
      onClose();
    } catch (error) {
      console.error("Error sending data to API:", error);
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
          <Box sx={{ mt: 0 }}>
            <TextField
              required
              label="Nombre Eleccion"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="dense"
            />
          </Box>
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
            onChange={handleChange}
            label="Nombre"
          >
            <MenuItem value="Activo">Activo</MenuItem>
            <MenuItem value="Inactivo">Inactivo</MenuItem>
          </Select>
        </FormControl>
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
          Crear Eleccion
        </Button>
      </Box>
    </Box>
  );
};

export default Form_Elecc;

Form_Elecc.propTypes = {
  onClose: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
};
