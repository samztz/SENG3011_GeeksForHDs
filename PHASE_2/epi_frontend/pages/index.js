import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar.js'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from "../components/theme.js"
import MapUSA from '../components/mapUSA'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from "@material-ui/core/styles";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    border: "2px solid red",
    flex: "1 1 auto",
    height:"calc(100% - 64px)" //height of toolbar if you know it beforehand
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default' }}
        >
          <Toolbar />
          <Box sx={{ display: 'flex', flexDirection: 'row', height: "calc(100vh - 64px)", p:2}}>
            <Box data-tip="" sx={{ display: 'flex', flexDirection: 'column', width:'70%' }}>
              <MapUSA />
            </Box>
            <Box sx={{ width:'30%', pl:2 }}>
            <Card sx={{ minWidth: '100%', minHeight: '100%' }} style={{backgroundColor: theme.palette.white.main}}>
              <CardContent>
                <Typography variant="h5" component="div">
                  INFO ABOUT HOW TO USE WEBSITE GOES HERE
                  ALSO CHARTS DISPLAYED HERE???
                </Typography>
              </CardContent>
            </Card>
            </Box>
            
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
    
  )
}