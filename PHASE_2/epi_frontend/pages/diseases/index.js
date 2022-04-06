import * as React from 'react';
import DashNav from "../../components/dashNav";
import { ThemeProvider } from '@mui/material/styles'
import { theme } from "../../components/theme.js"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
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

const diseases = [
    {name: 'Coronavirus', numberOfCases: 5892, bookmark: true},
    {name: 'Salmonella', numberOfCases: 150, bookmark: true},
    {name: 'Dengue', numberOfCases: 97, bookmark: false},
    {name: 'Malaria', numberOfCases: 503, bookmark: false},
    {name: 'Rabies', numberOfCases: 15, bookmark: false},
    {name: 'Cholera', numberOfCases: 278, bookmark: false},
    {name: 'Tuberculosis', numberOfCases: 294, bookmark: false},
    {name: 'Zika', numberOfCases: 403, bookmark: true},
]

function Diseases() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <DashNav pageName='Diseases' />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
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
            <Grid container spacing={2}>
                {diseases.map((item) => (
                    <Grid item>
                        <DiseaseLocationCard
                        name={item.name}
                        numberOfCases={item.numberOfCases}
                        bookmark={item.bookmark} />
                    </Grid>
                ))}
                {diseases.map((item) => (
                    <Grid item>
                        <DiseaseLocationCard
                        name={item.name}
                        numberOfCases={item.numberOfCases}
                        bookmark={item.bookmark} />
                    </Grid>
                ))}
                {diseases.map((item) => (
                    <Grid item>
                        <DiseaseLocationCard
                        name={item.name}
                        numberOfCases={item.numberOfCases}
                        bookmark={item.bookmark} />
                    </Grid>
                ))}
            </Grid>
            
          </Box>
        </Box>
      </Box>
      
    </ThemeProvider>
  );
}

export default Diseases 