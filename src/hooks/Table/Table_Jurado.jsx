import { Typography, Card, Avatar, CardContent, Container, Grid } from '@mui/material';
import PropTypes from 'prop-types';

const ViewMesasEleccion = ({ convocatorias, nombre_convocatoria, jurados }) => {

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
                                  
                                  <CardContent >
                                    {
                                      jurados.map((mesa, indexM) => {
                                        
                                        if(carrera.ID_CARRERA === mesa.ID_CARRERA){
                                          let i = 1;
                                          return  <div key={indexM} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',margin:"10px" }}>
                                                    <Typography variant="h7" sx={{ width: '20%'}}>
                                                        {`Mesa numero ${i++}`}
                                                    </Typography>
                                                    <Typography variant="h7" sx={{ width: '20%'}}>
                                                        {mesa.RANGO_APELLIDOS}
                                                    </Typography>
                                                    {mesa.relacion_jurado.map(
                                                        (jurado, indexJ) => {
                                                          return <Card key={indexJ}>
                                                                    <Avatar
                                                                    src='https://picsum.photos/600/400'
                                                                    alt=''
                                                                    sx={{ height: 56, width: 56 }}
                                                                    />
                                                                    <Typography variant="h7" sx={{ width: '100%' ,marginLeft:2}}>
                                                                        {`${jurado.relacion_uj.NOMBRE_USUARIO} ${jurado.relacion_uj.APELLIDO_USUARIO}`}
                                                                    </Typography>
                                                                    <Typography variant="h7" sx={{ width: '100%' ,marginLeft:2}}>
                                                                        {jurado.relacion_uj.cargo.NOMBRE_CARGO}
                                                                    </Typography>
                                                                    <Typography variant="h7" sx={{ width: '100%' ,marginLeft:2}}>
                                                                        {jurado.CARGO}
                                                                    </Typography>
                                                                    <Typography variant="h7" sx={{ width: '100%' ,marginLeft:2}}>
                                                                        {jurado.relacion_uj.CI_USUARIO}
                                                                    </Typography>
                                                                  </Card>
                                                          
                                                        }
                                                      )}
                                                  </div>
                                            
                                        }
                                      })
                                    }
                                  </CardContent>
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
}

export default ViewMesasEleccion;
