import BasicDatePicker from "../components/DatePicker"
import BasicTextField from "../components/BasicTextField"
import Box from '@mui/material/Box';
import BasicButton from "../components/BasicButton";
function Home() {
    return (
        <div>
            <h1>Home</h1>
            <Box 
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
                <BasicDatePicker />
                <BasicTextField title={"Origem"} />
                <BasicTextField title={"Destino"} />
                <BasicButton text={"BUSCAR"}/>
            </Box>
        </div>
    )
}

export default Home