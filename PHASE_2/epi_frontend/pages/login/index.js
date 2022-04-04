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
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item>
                <Card>
                <CardContent>
                    <Typography variant="h3" color="primary" fontWeight="fontWeightBold" textAlign="center" sx={{mb:1}}>Log In</Typography>
                    <TextField
                        id="outlined-email-input"
                        label="Email"
                        type="email"
                        autoComplete="current-email"
                        margin="dense"
                        fullWidth
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        margin="dense"
                        fullWidth
                        sx={{mb:1}}
                    />
                    <Grid container justifyContent={'center'}>
                        <Button variant="outlined" color='secondary' sx={{m:1, mb:0}}>Cancel</Button>
                        <Button variant="contained" color='secondary' sx={{m:1, mb:0}}>Log In</Button>
                    </Grid>
                </CardContent>
            </Card>
            </Grid>
            
        </Grid>
        
    </ThemeProvider>
  );
}

export default Login 