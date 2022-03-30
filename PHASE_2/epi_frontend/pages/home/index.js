import DashNav from "../../components/dashNav";
import { createTheme, ThemeProvider } from '@mui/material/styles'

// theme for frontend
const theme = createTheme({
  palette: {
    primary: {
      main: "#1F363D",
    },
    secondary: {
      main: "#F3F3F3",
    },
  },
});

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