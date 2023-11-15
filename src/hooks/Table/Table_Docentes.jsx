import Box from "@mui/joy/Box";
import PropTypes from "prop-types";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

export default function Table_Docente({ docentes }) {
  
  let n =1

  return (
    <Box sx={{ width: "100%" }}>
      <Sheet
        variant="outlined"
        sx={{
          // ... (tu estilo de fondo aquí)
        }}
      >
        <Table
          borderAxis="bothBetween"
          stripe="odd"
          hoverRow
          sx={{
            "& tr > *:first-of-type": {
              position: "sticky",
              left: 0,
              boxShadow: "1px 0 var(--TableCell-borderColor)",
              bgcolor: "background.surface",
            },
            "& tr > *:last-child": {
              position: "sticky",
              right: 0,
              bgcolor: "var(--TableCell-headBackground)",
            },
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 30 }}>#</th>
              <th style={{ width: 200 }}>Nombre</th>
              <th style={{ width: 150 }}>Cargo</th>
              <th style={{ width: 150 }}>Estado</th>
              <th style={{ width: 150 }}>Facultad</th>
              <th style={{ width: 150 }}>Carrera</th>
            </tr>
          </thead>
          <tbody>
            {docentes.map((docente, index) => (
                <tr key={index}>
                    <td>{n++}</td>
                    <td>{`${docente.NOMBRE_USUARIO} ${docente.APELLIDO_USUARIO}`}</td>
                    <td>{"Docente"}</td>
                    <td>{docente.HABILITADO}</td>
                    <td>{docente.relacion_uc.carrera.facultad.NOMBRE_FACULTAD}</td>
                    <td>{docente.relacion_uc.carrera.NOMBRE_CARRERA}</td>
                  </tr>))}
          </tbody>
        </Table>
      </Sheet>
      <Typography level="body-sm" textAlign="center" sx={{ pb: 2 }}>
        ← - →
      </Typography>
    </Box>
  );
}

Table_Docente.propTypes = {
  docentes: PropTypes.array.isRequired,
};
