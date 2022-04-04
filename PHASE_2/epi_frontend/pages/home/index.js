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

function DashHome() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <DashNav />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Card sx={{ mb: 2 }} width={'100%'}>
                <CardContent style={{backgroundColor: theme.palette.white.main}}>
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                    <Grid item container direction="column" xs={6} md={9}>
                      <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{mb:2}}>
                        <Button>Graphs</Button>
                        <Button>Map</Button>
                      </ButtonGroup>
                    
                    <img src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg" alt="map" width={'100%'} />
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