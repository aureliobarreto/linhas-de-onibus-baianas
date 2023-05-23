import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MyMap from "../components/MyMap";
import ButtonAppBar from "../components/ButtonAppBar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState, useEffect } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ListItemText from '@mui/material/ListItemText';
import '../pages/Home.css'
import api from "../services/axios.config.js";
import qs from 'qs'
import CoordenadasComponent from '../components/CoordenadasComponent';
import { json } from 'react-router-dom';
import axios from 'axios';
import TabelaHorarios from "../components/TimeTable.js";
import CalcularPontoMedio from "../services/pontoMedioService.js";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import ErrorBoundary from '../components/ErrorBoundary';

function Home() {
    const [linhas, setLinhas] = useState([]);
    const [formOrigem, setFormOrigem] = useState('');
    const [formDestino, setFormDestino] = useState('');
    const [formHora, setFormHora] = useState('');
    const [rows, setRows] = useState('');
    const [coordenadasOrigem, setCoordenadasOrigem] = useState([]);
    const [coordenadasDestino, setCoordenadasDestino] = useState([]);
    const [pontoMedio, setPontoMedio] = useState([]);

    const [isVisible, setIsVisible] = useState(false);
    
    const toggleVisibility = () => { setIsVisible(!isVisible); };
    

     useEffect(() => {
        createData()
     }, [linhas]) 

     function buscarPontoMedio () {
        if(coordenadasOrigem.length > 0 && coordenadasDestino.length > 0){
            setPontoMedio(CalcularPontoMedio(coordenadasOrigem[0],coordenadasOrigem[1],coordenadasDestino[0], coordenadasDestino[1]))
        }else{
            console.log('else ponto medio')
            setPontoMedio([-12.465285, -41.458080])
        }
     }
     const buscarCoordenadas = async (type) => {
        try {
            console.log("Origem: "+ formOrigem +" Destino: "+formDestino)
            
            const response = await axios.get('https://nominatim.openstreetmap.org/search', {
              params: {
                format: 'json',                
                q: type == 'origem'? `${formOrigem}, bahia`: `${formDestino}, bahia`,
                limit: 1,
              },
              
            });
  
            if (response.data && response.data.length > 0) {
              const latitude = parseFloat(response.data[0].lat);
              const longitude = parseFloat(response.data[0].lon);
              type == 'origem'?
                setCoordenadasOrigem([ latitude, longitude ])
                :             
                setCoordenadasDestino([latitude, longitude ])
                buscarPontoMedio()
               
            console.log("--- ",coordenadasOrigem)
            console.log("---| ",coordenadasDestino)
              
            } else {
                console.log("entra no else", response)
                type == 'origem'? setCoordenadasOrigem([-12.465285, -41.458080]) : setCoordenadasDestino([-12.465285, -41.458080])
            }
          } catch (error) {
            console.log('Erro ao buscar as coordenadas:');
            type == 'origem'? setCoordenadasOrigem([-12.465285, -41.458080]) : setCoordenadasDestino([-12.465285, -41.458080])
          }
        
    }

    // como passar o parametro de query pelo handle click
    const handleClick = async () => {
        buscarCoordenadas('origem')
        buscarCoordenadas('destino')
        
        const params = () => {
            let obj = {};
            if (formOrigem !== '') obj = {...obj, origem: formOrigem}
            if (formDestino !== '') obj = {...obj, destino: formDestino}
            if (formHora !== '') obj = {...obj, hora: formHora}
            return obj;
        }
        const queryParams = params();
        try {
            const res = await api.get(`/buscarLinhaPorTrechoEAgenda?${qs.stringify(queryParams)}`);
            console.log("Fetch data ", res.data)
            setLinhas(res.data)
            //createData()
            // console.log(`handleClick: ${JSON.stringify(linhas)}`)
        } catch (err) {
            console.log(err.message)
       }
     }
    
    function filtrarHorarios(horarios) {
        
        const obj = {
          "seg": [],
          "ter": [],
          "qua": [],
          "qui": [],
          "sex": [],
          "sab": [],
          "dom": []
        };
      
        horarios.forEach((horario, index) => {
          const diaSemana = index % 7;
      
        switch (diaSemana) {
            case 0:
                obj.seg.push(horario);
                break;
            case 1:
                obj.ter.push(horario);
                break;
            case 2:
                obj.qua.push(horario);
                break;
            case 3:
                obj.qui.push(horario);
                break;
            case 4:
                obj.sex.push(horario);
                break;
            case 5:
                obj.sab.push(horario);
                break;
            case 6:
                obj.dom.push(horario);
                break;
            default:
                break;
        }
        });
      
        return obj;
      }

      
    
    function createData() { 
        const newRows = []
        linhas.forEach(element => {           
           newRows.push({
            "codigo": element.codigo,
            "origem" : element.paradas[0],
            "destino":  element.paradas[element.paradas.length -1],
            "horariosOrigem": filtrarHorarios(element.horariosOrigem),
            "horariosDestino": filtrarHorarios(element.horariosDestino),
            "paradas": element.paradas.slice(1, -1)
           } )
        });
        console.log('----------------', newRows)
        setRows(newRows) 
   

    }

   
      
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
                {/* <BasicDatePicker  /> */}
                <TextField value={formOrigem} onChange={e => setFormOrigem(e.target.value)} id="outlined-basic" label="Origem" variant="outlined" />

                <TextField value={formDestino} onChange={e => setFormDestino(e.target.value)} id="outlined-basic" label="Destino" variant="outlined" />
                
                <Button onClick={handleClick} type='submit' variant="contained" size="small" color="primary" >Buscar</Button>
                {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Todos os dias" /> */}
            </Box>

             {/* Abaixo terá uma div com dimensões quadradas para receber o mapa */}
            {(isVisible && linhas.length > 0 && formDestino != '' && formOrigem != '') && <Card sx={{
                mx: 'auto', my: 'auto'
            }} align='center' className="map">
                <CardContent >
                    
                        <MyMap className="map" origem={coordenadasOrigem} destino={coordenadasDestino} center={pontoMedio} />;
                    
                </CardContent>                     
            </Card> }           
                
            {/* TABELA */}
            {(linhas.length == 0 ) &&
                <Typography sx={{mx: 'auto', my: 'auto'}} align="center">Realize uma consulta</Typography>
                
            }
           
            { linhas.length > 0 && 
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="left">Origem</TableCell>
                        <TableCell align="right">Destino</TableCell>
                        <TableCell align="left">Horários</TableCell>
                        <TableCell align="left">Paradas</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.codigo}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.origem}
                        </TableCell>
                        <TableCell align="right">{row.destino}</TableCell>
                        <TableCell align="right">
                        <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                            <AccessTimeFilledIcon />
                        </AccordionSummary>
                        <AccordionDetails>
                            {/* TABELA DE HORARIOS */}
                            <TabelaHorarios horarios={row.horariosOrigem} cidade={row.origem} />
                            <TabelaHorarios horarios={row.horariosDestino} cidade={row.destino} />
                        </AccordionDetails>
                        </Accordion>
                        </TableCell>                    
                        <TableCell align="right">
                        <Accordion sx={{maxWidth: 400 }} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                            <Typography>Paradas</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography style={{ maxHeight: '200px', overflow: 'auto' }}>                                                     
                            {row.paradas.map((d) => 
                                
                                <ListItem >
                                    <ListItemIcon>
                                        <LocationOnIcon style={{ color: 'red' }} />
                                    </ListItemIcon>
                                    {d}
                                </ListItem>)}
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                        </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}

            
            
           {(formOrigem != '' && formDestino != '') && <Fab variant="extended" sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                }}
                color="primary"
                onClick={toggleVisibility} >
            <NavigationIcon sx={{ mr: 1 }} />
            {!isVisible ? <p>Ver no Mapa</p> : <p>Ocultar Mapa</p>}
            
            </Fab> }
        </div>
    )
}

export default Home