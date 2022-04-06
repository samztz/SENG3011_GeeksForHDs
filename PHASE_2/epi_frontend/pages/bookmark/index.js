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
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkCard from '../../components/bookmarkCard';

const locations = [
  {name: 'Australia', numberOfCases: 5892},
  {name: 'China', numberOfCases: 150},
  {name: 'United States', numberOfCases: 97},
  {name: 'Salmonella', numberOfCases: 503},
  {name: 'Canada', numberOfCases: 15},
  {name: 'United Kingdom', numberOfCases: 278},
  {name: 'Dengue', numberOfCases: 97},
  {name: 'Coronavirus', numberOfCases: 5892},
]

function Bookmark() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <DashNav pageName='Locations' />
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
                {locations.map((item) => (
                    <Grid item>
                        <BookmarkCard
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

export default Bookmark 
