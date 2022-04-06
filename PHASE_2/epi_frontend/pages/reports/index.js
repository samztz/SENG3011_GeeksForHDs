import * as React from 'react';
import DashNav from "../../components/dashNav";
import { ThemeProvider } from '@mui/material/styles'
import { theme } from "../../components/theme.js"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ReportsTable from "../../components/reportsTable";
import FilterDropdowns from "../../components/filterDropdowns";
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DiseaseLocationCard from '../../components/diseaseLocationCard';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search'; 
import dummydata from '../../constants/demodummydata.json';
import { List } from '@mui/material';

export default function report() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <DashNav pageName='Reports' />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Grid container item justifyContent={'space-between'}>
              <TextField
                variant="outlined"
                color="primary"
                id="search-bar"
                label="Search"
                size="small"
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <SearchIcon />
                    </InputAdornment>
                ),
                }}
                sx={{mb:2, width: 300}}
              /> 
              <Button variant="contained" color='secondary'>Download as CSV</Button>
            </Grid>
            
            <TableContainer>
              <Table sx={{minWidth: 650}}>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>Country</TableCell>
                    <TableCell>Description</TableCell> 
                    <TableCell>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dummydata.map((list, index) => (
                    <TableRow key={index}>
                      <TableCell>{list.name}</TableCell>
                      <TableCell>{list.city}</TableCell>
                      <TableCell>{list.country}</TableCell>
                      <TableCell>{list.description}</TableCell>
                      <TableCell>{list.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
    
  )
}
