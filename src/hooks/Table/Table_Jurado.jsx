import { Typography, Card, Avatar, CardContent, Container, Grid } from '@mui/material';
import PropTypes from 'prop-types';

const ViewMesasEleccion = ({ convocatorias, nombre_convocatoria, jurados }) => {

  return (
    <Container>
      { convocatorias.map((convocatoria) => {
          if(convocatoria.NOMBRE_CONVOCATORIA === nombre_convocatoria){
            if(convocatoria.relacion_fc.length !== 0){
              convocatoria.relacion_fc.map((facultad, keyFacultad)=>
                {
                  return  <Grid
                            key={ keyFacultad }
                          >
                            <Typography variant="h5" sx={{ borderBottom: '2px solid black', width: '100%'}} >
                              {facultad.NOMBRE_FACULTAD}
                            </Typography>
                            <Grid
                              container spacing={2}
                            >
                              { facultad.carrera.map((carrera, keyCarrera) => (
                                  <Grid
                                    key={ keyCarrera }
                                    item xs={12} sm={6} md={3}
                                  >
                                    <Card
                                      item xs={12} sm={6} md={3}
                                    >
                                      <Typography
                                        variant="h6" sx={{ borderBottom: '2px solid black', width: '100%', textDecoration: 'none'}}
                                      >
                                        {carrera.NOMBRE_CARRERA}
                                      </Typography>
                                      <CardContent >
                                        {
                                            jurados.map((persona, pIndex) => {
                                                if(carrera.NOMBRE_CARRERA.toUpperCase() === persona.relacion_cj.NOMBRE_CARRERA.toUpperCase()){
                                                    return  <div key={pIndex} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',margin:"10px" }}>
                                                                <Avatar
                                                                src='https://picsum.photos/600/400'
                                                                alt=''
                                                                sx={{ height: 56, width: 56 }}
                                                                />
                                                                <Typography variant="h7" sx={{ width: '100%' ,marginLeft:2}}>
                                                                    {`${persona.relacion_uj.NOMBRE_USUARIO} ${persona.relacion_uj.APELLIDO_USUARIO}`}
                                                                </Typography>
                                                            </div>
                                                }
                                            })
                                        }
                                      </CardContent>
                                    </Card>
                                  </Grid>
                                ))}
                            </Grid>
                          </Grid>
                }
              )
            }
          }
        })}
    </Container>
    
  );
};

ViewMesasEleccion.propTypes = {
  convocatorias: PropTypes.array.isRequired,
  nombre_convocatoria: PropTypes.string.isRequired,
  jurados: PropTypes.array.isRequired,
}

export default ViewMesasEleccion;
