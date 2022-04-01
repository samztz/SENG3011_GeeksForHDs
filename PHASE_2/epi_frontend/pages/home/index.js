import DashNav from "../../components/dashNav";
import { ThemeProvider } from '@mui/material/styles'
import { theme } from "../../components/theme.js"

// theme for frontend
/*const theme = createTheme({
  palette: {
    primary: {
      light: "#1F5768",
      main: "#1F363D",
      contrastText: "#F3F3F3",
    },
    secondary: {
      main: "#44AD9E",
      contrastText: "#F3F3F3",
    },
    white: {
      main: "#F3F3F3",
    },
  },
});*/

function About() {
  return (
    <ThemeProvider theme={theme}>
      <DashNav>
        <div>About</div>
      </DashNav>
    </ThemeProvider>
  );
}

export default About 