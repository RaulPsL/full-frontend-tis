import Client from "../../components/layout/client/Client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from "react";
import { getApiJurado } from "../../api/api";
import { Box, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";


const MapaComponent = () => {
    const [mesas, setmesas] = useState([]);
    let parx = -17.39372;
    let pary = -66.14672;
    useEffect(() => {
        const fetchData = async () => {
            try {
              let result = await getApiJurado();
              setmesas(result);
            } catch (error) {
              console.log('Error fetching data: ', error);
            }
          }
          fetchData();
      }, []);
    return (
        <Client style={{ height: '100px', width: '100px', overflow: 'hidden' }}>
            <Box>
                <Grid item>
                    <Link to="/">
                        <Button variant="outlined">
                        {"VOLVER"}
                        </Button>
                    </Link>
                </Grid>
            </Box>
            <MapContainer 
                center={[parx, pary]} 
                zoom={20} 
                style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© OpenStreetMap contributors'
                />
                <Marker position={[parx, pary]}>
                    <Popup>
                        Paseo autonomico
                    </Popup>
                </Marker>
                {
                    mesas.map((mesa, keyMap) => {
                            return (<Marker key={keyMap} position={[ mesa.PARX, mesa.PARY ]}>
                                        <Popup>
                                            {`Numero mesa ${mesa.ID_MESA}`}
                                        </Popup>
                                    </Marker>)
                        }
                    )
                }
                </MapContainer>
        </Client>
    );
};


MapaComponent.propTypes = {
  
};


export default MapaComponent;

