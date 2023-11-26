import { Box, Typography } from "@mui/material";
import Client from "../../../components/layout/client/Client";
import Carousel from "react-material-ui-carousel";

const items = [
  {
    title: "MISIÓN",
    content:
      "Garantizar procesos electorales eficaces y transparentes en defensa de los principios democráticos y éticos, fundamentados en la regulación de la conducta, las relaciones entre todos los actores de la comunidad universitaria, en el marco del nuevo Estatuto Universitario y el reglamento electoral universitario; encaminados a la unificación de los calendarios electorales facultativos y una administración independiente en los procesos electorales universitarios, así como asegurar la libertad, honradez y eficacia del sufragio de la institución, con respeto al pluralismo político en los diferentes procesos electorales.",
  },
  {
    title: "VISIÓN",
    content:
      "Ser reconocido nacional e internacionalmente como un organismo universitario con el más alto prestigio en los procesos electorales enfocados en la autonomía universitaria, para autogobernarse mediante la elección libre de sus autoridades y representantes estamentarios docentes-estudiantes en un modelo participativo transparente y democrático mediante la capacitación e innovación tecnológica permanente para el perfeccionamiento de la democracia.",
  },
];

export default function Comite() {
  return (
    <Client>
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <img
          src="../../../../public/umss.jpg"
          alt="UMSS"
          style={{
            width: "100%",
            maxHeight: "100vh",
            objectFit: "cover",
            position: "absolute",
            zIndex: -1,
          }}
        />
        <Carousel
          sx={{
            margin: "auto",
            width: "100%",
          }}
        >
          {items.map((item, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="center"
              minHeight="50vh"
              bgcolor="rgba(0, 0, 0, 0.5)"
              color="white"
              textAlign="justify"
              width="100%"
            >
              <Box maxWidth="600px">
                <Typography variant="h4" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body1">{item.content}</Typography>
              </Box>
            </Box>
          ))}
        </Carousel>
      </Box>
    </Client>
  );
}
