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
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box>
                      <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button>Graphs</Button>
                        <Button>Map</Button>
                      </ButtonGroup>
                    </Box>
                    <img src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg" alt="map" width={'70%'} />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h5" fontWeight="fontWeightBold" sx={{mb:1}}>Filter By:</Typography>
                    <FilterDropdowns />
                  </Box>
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