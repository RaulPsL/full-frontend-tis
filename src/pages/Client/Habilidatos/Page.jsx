import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Collapse,
  Grid,
  Button,
  Modal,
  Paper,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { getApiEstudiantes, getApiFac } from "../../../api/api";
import html2pdf from "html2pdf.js";
import Client from "../../../components/layout/client/Client";

const Habilitados = () => {
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [usuariosData, setUsuariosData] = useState([]);
  const [facultadesCarreras, setFacultadesCarreras] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState(null);

  useEffect(() => {
    getApiEstudiantes().then((data) => {
      setUsuariosData(data);
    });

    getApiFac().then((data) => {
      setFacultadesCarreras(data);
    });
  }, []);
  console.log(usuariosData);
  const handleCardClick = (cardId) => {
    setExpandedCardId(cardId === expandedCardId ? null : cardId);
  };

  const closePreview = () => {
    setPreviewContent(null);
    setPreviewOpen(false);
  };

  const generatePDFContent = (faculty) => {
    const pdfContainer = document.createElement("div");

    const facultyTitle = document.createElement("h2");
    facultyTitle.innerText = faculty.NOMBRE_FACULTAD;
    pdfContainer.appendChild(facultyTitle);

    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    const thead = document.createElement("thead");
    const theadRow = document.createElement("tr");
    ["Carrera", "Nombres", "Apellidos", "CI", "Habilitado"].forEach(
      (header) => {
        const th = document.createElement("th");
        th.innerText = header;
        th.style.border = "1px solid #dddddd";
        th.style.textAlign = "left";
        theadRow.appendChild(th);
      }
    );
    thead.appendChild(theadRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    // Obtener una lista ordenada de usuarios por apellido
    const sortedUsers = usuariosData.sort((a, b) =>
      a.APELLIDO_USUARIO.localeCompare(b.APELLIDO_USUARIO)
    );

    sortedUsers.forEach((user) => {
      const filteredCarreras = faculty.carrera.filter(
        (carrera) => carrera.ID_CARRERA === user.relacion_uc.ID_CARRERA
      );

      filteredCarreras.forEach((carrera) => {
        const tr = document.createElement("tr");

        const carreraTd = document.createElement("td");
        carreraTd.innerText = user.relacion_uc.carrera.NOMBRE_CARRERA;
        tr.appendChild(carreraTd);

        [
          "NOMBRE_USUARIO",
          "APELLIDO_USUARIO",
          "CI_USUARIO",
          "HABILITADO",
        ].forEach((key) => {
          const td = document.createElement("td");
          td.innerText = user[key];
          td.style.border = "1px solid #dddddd";
          td.style.textAlign = "left";
          tr.appendChild(td);
        });

        tbody.appendChild(tr);
      });
    });

    table.appendChild(tbody);
    pdfContainer.appendChild(table);

    return pdfContainer;
  };

  const downloadPDF = (faculty) => {
    const pdfContent = generatePDFContent(faculty);

    const pdfOptions = {
      margin: 10,
      filename: `${faculty.NOMBRE_FACULTAD}_Lista_Habilitados.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    const pdfObject = html2pdf(pdfContent, pdfOptions);

    pdfObject
      .outputPdf()
      .then((pdfBlob) => {
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPreviewContent(pdfUrl);
        setPreviewOpen(true);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  return (
    <Client>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        m={"8px"}
      >
        <Box
          minHeight="80vh"
          textAlign="justify"
          width="80%"
          m={"90px"}
          style={{ color: "#0C2963" }}
        >
          <Typography variant="h4" m={"8px"} style={{ fontWeight: "bold" }}>
            NÓMINA DE HABILITADOS E INHABILITADOS
          </Typography>
          {facultadesCarreras.map((facultad) => (
            <Card
              key={facultad.ID_FACULTAD}
              onClick={() => handleCardClick(facultad.ID_FACULTAD)}
              style={{
                marginBottom: 10,
                backgroundColor:
                  expandedCardId === facultad.ID_FACULTAD ? "white" : "#0C2963",
                color:
                  expandedCardId === facultad.ID_FACULTAD ? "black" : "white",
              }}
            >
              <CardContent>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item xs={11}>
                    <Typography variant="h6" gutterBottom>
                      {facultad.NOMBRE_FACULTAD}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <AddCircleOutlineIcon />
                  </Grid>
                </Grid>
              </CardContent>
              <Collapse in={expandedCardId === facultad.ID_FACULTAD}>
                <CardContent>
                  <Typography variant="body2">
                    En esta sección te proporcionamos la nómina de los
                    candidatos habilitados e inhabilitados de las diferentes
                    convocatorias de esta facultad. Puede acceder a la
                    información a través del siguiente enlace:
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => downloadPDF(facultad)}
                    sx={{ marginTop: "20px" }}
                  >
                    Descargar Lista de Habilitados
                  </Button>
                </CardContent>
              </Collapse>
            </Card>
          ))}
        </Box>
      </Box>
      <Modal open={previewOpen} onClose={closePreview}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Vista previa del PDF
          </Typography>
          <Paper>{previewContent}</Paper>
        </Box>
      </Modal>
    </Client>
  );
};

export default Habilitados;
