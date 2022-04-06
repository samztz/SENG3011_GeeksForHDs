import DashNav from "../../components/dashNav";
import { ThemeProvider } from '@mui/material/styles'
import { theme } from "../../components/theme.js"
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Chart } from "react-google-charts";

const data = [
    ["Month", "Coronavirus", "Hentavirus"],
    ["March", 200, 400],
    ["July", 1170, 460],
    ["August", 660, 1120],
    ["September", 1030, 540],
    ["October",300,400]
];

const options = {
    title: "Article frequency by Month",
    legend: { position: "bottom" },
    hAxis: {
        title: 'Month'
      },
      vAxis: {
        title: 'Number of reports'
    }
    
  };

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
            
          <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
          </Box>
        </Box>
      </Box>
      
    </ThemeProvider>
  );
}

export default About 