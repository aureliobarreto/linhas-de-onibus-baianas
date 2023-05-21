import Checkbox from '@mui/material/Checkbox';
import CardActions from '@mui/material/CardActions';
import FormControlLabel from '@mui/material/FormControlLabel';
import BasicDatePicker from "../components/DatePicker"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MyMap from "../components/MyMap";
import ButtonAppBar from "../components/ButtonAppBar";
import React from "react";
import '../pages/Home.css'
import { Card } from '@mui/material';
import api from "./services/api";

function Home() {
    return (
        <div>
            <ButtonAppBar />
            <Box
                justifyContent="center"
                component="div"
                sx={{
                    display: 'flex',
                    '& > :not(style)': { m: 3, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <BasicDatePicker  />
                <TextField id="outlined-basic" label="Origem" variant="outlined" />
                <TextField id="outlined-basic" label="Destino" variant="outlined" />
                <Button variant="contained" size="small" color="primary" >Buscar</Button>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Todos os dias" />
            </Box>           
                
            {/* Abaixo terá uma div com dimensões quadradas para receber o mapa */}
            <Card className="map">
                <h3>Mapa</h3>  
                {/* <CardActions>
                <Button size="small" color="primary">
                Ver
                </Button>
                </CardActions> */}
                <MyMap className="map" />
            </Card>
        </div>
    )
}

export default Home