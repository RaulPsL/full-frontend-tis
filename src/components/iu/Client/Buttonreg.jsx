//import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button variant="text" sx={{ color: "white" }} onClick={() => loginWithRedirect()} >Iniciar sesion</Button>;
  //<button onClick={() => loginWithRedirect()}>Login</button>;
};