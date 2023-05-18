import BasicDatePicker from "../components/DatePicker"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
//import BasicButton from "../components/BasicButton";
import Button from '@mui/material/Button';
import MyMap from "../components/MyMap";
import ButttonAppBar from "../components/ButtonAppBar";
import React from "react";
import '../pages/Home.css'

function Home() {
    return (
        
        <div>
            <ButttonAppBar />
        <Box
            justifyContent="center"
            component="div"
            sx={{
                display: 'flex',
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <BasicDatePicker  />
            <TextField id="outlined-basic" label="Oriegm" variant="outlined" />
            <TextField id="outlined-basic" label="Destino" variant="outlined" />
            <Button variant="contained" size="small" color="primary" >Buscar</Button>
        </Box>           
            
            {/* Abaixo terá uma div com dimensões quadradas para receber o mapa */}
                <div className="map">
                    <h1>Mapa</h1>  
                    <MyMap className="map" />
                </div>
                
           
           
        </div>
    )
}

export default Home