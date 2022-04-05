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

function DashHome() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <DashNav pageName='Home' />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Card sx={{ mb: 2, minWidth: '100%' }}>
                <CardContent style={{backgroundColor: theme.palette.white.main}}>
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                    <Grid item container direction="column" xs={6} md={9}>
                      <img src="/world.png" alt="map" width={'100%'} />
                    </Grid>
                  <Grid item container direction="column" alignItems="center" xs={6} md={3}>
                    <Typography variant="h5" fontWeight="fontWeightBold" sx={{mb:1}}>Filter By:</Typography>
                    <FilterDropdowns />
                  </Grid>
                  </Grid>
                </CardContent>
            </Card>
          </Box>
          <Box>
            <Card>
              <CardContent style={{backgroundColor: theme.palette.white.main}}>
                <Typography variant="h4" fontWeight="fontWeightBold" sx={{mb:2}}>Reports</Typography>
                <ReportsTable />
              </CardContent>
            </Card>
            
          </Box>
        </Box>
      </Box>
      
    </ThemeProvider>
  );
}

export default DashHome 
