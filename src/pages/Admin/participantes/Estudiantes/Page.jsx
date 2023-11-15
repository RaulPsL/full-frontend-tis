import { useState, useEffect } from "react";
import { Admin } from "../../../../components/layout/admin/Admin";
import { Grid, Typography } from "@mui/material";
import { containerChartStyles } from "../../Home/utils/HomeStyles";
import { getApiEstudiantes } from "../../../../api/api";
import Table_Estudiante from "../../../../hooks/Table/Table_Estudiantes";

const Page_Estudiantes = () => {
  let name = "Estudiantes habilitados y no habilitados";
  
  const [estudiantes, setestudiantes] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
        try {
          let result = await getApiEstudiantes();
          setestudiantes(result);
        } catch (error) {
          console.log('Error fetching data: ', error);
        }
      }
      fetchData();
  }, []);
  return (
    <Admin>
      <Grid container spacing={2}>
        {/* ... */}
        <Grid item xs={12} md={12} lg={12}>
          <Grid container style={containerChartStyles}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                sx={{ borderBottom: "2px solid black", width: "100%" }}
              >
                {name}
              </Typography>

            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container style={containerChartStyles}>
            <Grid item xs={12}>
              { <Table_Estudiante estudiantes={ estudiantes }/> }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Admin>
  );
};

export default Page_Estudiantes;
