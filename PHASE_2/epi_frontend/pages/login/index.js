import * as React from 'react';
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
import Link from 'next/link';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function Login() {
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
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
                            sx={{ mb: 1 }}
                        />
                        <FormControl sx={{ mb: 1 }} variant="outlined" fullWidth margin='dense'>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <Grid container justifyContent={'center'}>
                            <Link href="/">
                                <Button variant="outlined" color='secondary' sx={{m:1, mb:0}}>Cancel</Button>
                            </Link>
                            <Link href="/home">
                                <Button variant="contained" color='secondary' sx={{m:1, mb:0}}>Log In</Button>
                            </Link>
                        </Grid>
                    </CardContent>
                </Card>
                </Grid>
                
            </Grid>
            
        </ThemeProvider>
    );
}

export default Login 