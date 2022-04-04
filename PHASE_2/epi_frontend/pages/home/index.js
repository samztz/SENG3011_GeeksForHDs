import DashNav from "../../components/dashNav";
import { ThemeProvider } from '@mui/material/styles'
import { theme } from "../../components/theme.js"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Card from '@mui/material/Card';
import ReportsTable from "../../components/reportsTable";

function About() {
  return (
    <ThemeProvider theme={theme}>

      <Box sx={{ display: 'flex' }}>
        <DashNav />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <Box>

          </Box>
          <Box>
            <Card>
              <ReportsTable />
            </Card>
            
          </Box>
        </Box>
      </Box>
      

    </ThemeProvider>
  );
}

export default About 