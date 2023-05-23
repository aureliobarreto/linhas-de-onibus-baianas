import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography  from "@mui/material/Typography";

const TabelaHorarios = ({ horarios, cidade }) => {
  const diasSemana = Object.keys(horarios);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <TableContainer component={Paper}>
        <Typography
          align="left" 
          id="tableTitle"
        >
          {`Saída ${cidade}`}
        </Typography>
    <Table aria-labelledby='tableTitle' >
      <TableHead>
        <TableRow>
          {diasSemana.map((dia) => (
            <th align="center" key={dia}>{dia}</th>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {horarios[diasSemana[0]].map((_, index) => (
          <StyledTableRow  key={index}>
            {diasSemana.map((dia) => (
              <td align='center' key={dia}>{horarios[dia][index]}</td>
            ))}
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>

    </TableContainer>
  );
};

export default TabelaHorarios;
