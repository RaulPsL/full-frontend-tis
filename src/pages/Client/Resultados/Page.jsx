import React, { useState, useEffect } from "react";
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
import { getApi, getApiFac } from "../../../api/api";
import html2pdf from "html2pdf.js";
import Client from "../../../components/layout/client/Client";

const Resultados = () => {
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [votos, setVotos] = useState([]);
  const [facultadesCarreras, setFacultadesCarreras] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState(null);

  useEffect(() => {
    getApi("votos").then((data) => {
      setVotos(data);
    });

    getApiFac().then((data) => {
      setFacultadesCarreras(
        data.map((facultad) => ({ ...facultad, totalVotos: 0 }))
      );
    });
  }, []);

  const handleCardClick = (cardId) => {
    setExpandedCardId(cardId === expandedCardId ? null : cardId);
  };

  const closePreview = () => {
    setPreviewContent(null);
    setPreviewOpen(false);
  };

  const generatePDFContent = () => {
    const pdfContainer = document.createElement("div");

    votos.forEach((voto) => {
      const votoTitle = document.createElement("h2");
      votoTitle.innerText = `Resultados - ${voto.convocatoria.NOMBRE_CONVOCATORIA}`;
      pdfContainer.appendChild(votoTitle);

      const table = document.createElement("table");
      table.style.width = "100%";
      table.style.borderCollapse = "collapse";

      const thead = document.createElement("thead");
      const theadRow = document.createElement("tr");
      ["Frente", "Votos"].forEach((header) => {
        const th = document.createElement("th");
        th.innerText = header;
        th.style.border = "1px solid #dddddd";
        th.style.textAlign = "left";
        theadRow.appendChild(th);
      });
      thead.appendChild(theadRow);
      table.appendChild(thead);

      const tbody = document.createElement("tbody");

      const tr = document.createElement("tr");

      const frenteTd = document.createElement("td");
      frenteTd.innerText = voto.frente.NOMBRE_FRENTE;
      tr.appendChild(frenteTd);

      const votosTd = document.createElement("td");
      votosTd.innerText = voto.votos.toString();
      tr.appendChild(votosTd);

      tbody.appendChild(tr);

      table.appendChild(tbody);
      pdfContainer.appendChild(table);
    });

    return pdfContainer;
  };

  const downloadPDF = () => {
    const pdfContent = generatePDFContent();

    const pdfOptions = {
      margin: 10,
      filename: "Resultados_Votaciones.pdf",
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
          <Box textAlign="center" my={4}>
            <Typography variant="h4" m={2} fontWeight="bold">
              RESULTADOS FINALES
            </Typography>
            <Typography>
              Para visualizar los resultados de las diferentes elecciones,
              dependiendo de la facultad a la que pertenece, haga clic en el
              botón que indica su facultad.
            </Typography>
          </Box>
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
                    RESULTADOS {facultad.NOMBRE_FACULTAD}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => downloadPDF(facultad)}
                    sx={{ marginTop: "20px" }}
                  >
                    Descargar resultados
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

export default Resultados;
