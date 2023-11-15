// import React from "react";
import { Chart } from "react-google-charts";

const data = [
  ["Pais", "Usuarios", { role: "style" }],
  ["USA", 35, "#b87333"], // RGB value
  ["Canada", 18, "silver"], // English color name
  ["Brazil", 30, "gold"],
  ["Bo", 11.45, "color: red"], // CSS-style declaration
  // ... agregar más países aquí
];

// Ordenar los países por User Count en orden descendente
data.sort((a, b) => b[1] - a[1]);

const options = {
  chart: {
    title: "Card",
  },
  bars: "horizontal",
  vAxis: {
    title: "P a i s",
  },

  // Establecer barras horizontales
};

const Geo = () => {
  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
};

export default Geo;
