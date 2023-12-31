import { Typography, Card, CardContent, Container, Grid, Button, TableContainer, TableHead, TableCell, TableRow, TableBody, Table } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from 'prop-types';

const ViewMesasEleccion = ({ convocatorias, nombre_convocatoria, jurados, changeJurado }) => {

  return (
    <Container>
      { nombre_convocatoria  !== "" ?
        convocatorias.find(
          (convocatoria) => convocatoria.NOMBRE_CONVOCATORIA === nombre_convocatoria
          ).relacion_fc.map(
            (relacion, keyFacultad) => {
              return  <Grid
                        key={ keyFacultad }
                      >
                        <Typography variant="h5" sx={{ borderBottom: '2px solid black', width: '100%'}} >
                          {relacion.facultad.NOMBRE_FACULTAD}
                        </Typography>
                        <Grid
                          container spacing={2}
                        >
                          { relacion.facultad.carrera.map((carrera, keyCarrera) => {
                            return (<Grid
                                key={ keyCarrera }
                                item xs={12} 
                              >
                                <Card
                                  item xs={12} sm={6} md={3}
                                >
                                  <Typography
                                    variant="h6" sx={{ borderBottom: '2px solid black', width: '100%', textDecoration: 'none'}}
                                  >
                                    {carrera.NOMBRE_CARRERA}
                                  </Typography>
                                  <TableContainer>
                                  <TableBody>
                                  <CardContent >
                                    {
                                      jurados.map((mesa, indexM) => {
                                        
                                        if(carrera.ID_CARRERA === mesa.ID_CARRERA){
                                          let i = 1;

                                          return  <div key={indexM} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',margin:"10px" }}>
                                                    <TableContainer>
                                                      <Table>
                                                        <TableHead>
                                                          <TableRow>
                                                            <TableCell>Mesa</TableCell>
                                                            <TableCell>Rango de Apellidos</TableCell>
                                                            <TableCell>Jurados</TableCell>
                                                          </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                          <TableCell>
                                                            <Typography variant="h7" sx={{ width: '20%'}}>
                                                                {`Mesa numero ${i++}`}
                                                            </Typography>
                                                          </TableCell>
                                                          <TableCell>
                                                            <Typography variant="h7" sx={{ width: '20%'}}>
                                                                {mesa.RANGO_APELLIDOS}
                                                            </Typography>
                                                          </TableCell>
                                                          <TableCell>
                                                          {mesa.relacion_jurado.map(
                                                              (jurado, indexJ) => {
                                                                return <Card key={indexJ}>
                                                                          <TableContainer>
                                                                            <Table>
                                                                              <TableHead>
                                                                                <TableRow>
                                                                                  <TableCell>Nombre Jurado</TableCell>
                                                                                  <TableCell>Cargo</TableCell>
                                                                                  <TableCell>Cargo jurado</TableCell>
                                                                                  <TableCell>CI</TableCell>
                                                                                  <TableCell>Cambiar</TableCell>
                                                                                </TableRow>
                                                                              </TableHead>
                                                                            </Table>
                                                                          </TableContainer>
                                                                          <TableBody>
                                                                            <TableCell>
                                                                            <Typography variant="h7" sx={{ width: '90%'}}>
                                                                                {`${jurado.relacion_uj.NOMBRE_USUARIO} ${jurado.relacion_uj.APELLIDO_USUARIO}`}
                                                                            </Typography>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                            <Typography variant="h7" sx={{ width: '90%'}}>
                                                                                {jurado.relacion_uj.cargo.NOMBRE_CARGO}
                                                                            </Typography>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                            <Typography variant="h7" sx={{ width: '90%'}}>
                                                                                {jurado.CARGO}
                                                                            </Typography>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                            <Typography variant="h7" sx={{ width: '90%'}}>
                                                                                {jurado.relacion_uj.CI_USUARIO}
                                                                            </Typography>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <Button 
                                                                                  size="sm" 
                                                                                  variant="soft" 
                                                                                  color="danger" 
                                                                                  onClick={ () => changeJurado({ CARGO:jurado.CARGO }, jurado.ID_JURADO) }>
                                                                                      <DeleteIcon fontSize="inherit" />
                                                                                </Button>
                                                                            </TableCell>
                                                                          </TableBody>
                                                                        </Card>
                                                                
                                                              }
                                                            )}
                                                          </TableCell>
                                                        </TableBody>
                                                      </Table>
                                                    </TableContainer>
                                                  </div>
                                        }
                                      })
                                    }
                                  </CardContent>
                                </TableBody>
                                </TableContainer>
                                </Card>
                              </Grid>)
                            })}
                        </Grid>
                      </Grid>
            }
          )
        :null}
    </Container>
    
  );
};

ViewMesasEleccion.propTypes = {
  convocatorias: PropTypes.array.isRequired,
  nombre_convocatoria: PropTypes.string.isRequired,
  jurados: PropTypes.array.isRequired,
  changeJurado: PropTypes.func.isRequired
}

export default ViewMesasEleccion;
