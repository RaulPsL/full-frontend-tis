// import React from "react";

import { Box } from "@mui/material";
import Client from "../../../components/layout/client/Client";

export default function Home() {
  return (
    <Client>
      <Box display="flex" minHeight="100vh" m={0} p={0}>
        <img
          src="../../../../public/umss.jpg"
          alt="Italian Trulli"
          style={{
            width: "100%",
            maxHeight: "100vh",
            objectFit: "cover",
          }}
        />
      </Box>
    </Client>
  );
}
