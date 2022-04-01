import { ThemeProvider } from '@mui/material/styles'
import { theme } from "../../components/theme.js"
import Paper from '@mui/material/Paper';
import { Button, CssBaseline, GlobalStyles } from "@mui/material";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function Login() {
  return (
    <ThemeProvider theme={theme}>
        <GlobalStyles styles={{ body: { backgroundColor: theme.palette.primary.main } }} />
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item>
                <Card>
                <Typography>Log In</Typography>
                <TextField
                    id="outlined-email-input"
                    label="Email"
                    type="email"
                    autoComplete="current-email"
                    fullWidth
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    fullWidth
                />
                <Box>
                    <Button variant="outlined" color='secondary' sx={{m:2}}>Cancel</Button>
                    <Button variant="contained" color='secondary'>Log In</Button>
                </Box>
            </Card>
            </Grid>
            
        </Grid>
        
    </ThemeProvider>
  );
}

export default Login 