import Link from '@mui/material/Link'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react';
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar.js'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from "../components/theme.js"
import MapUSA from '../components/mapUSA'
import CountyCaseChart from '../components/CountyCaseChart'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from "@material-ui/core/styles";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';

const useStyles = makeStyles(theme => ({
  root: {
    border: "2px solid red",
    flex: "1 1 auto",
    height:"calc(100% - 64px)" //height of toolbar if you know it beforehand
  }
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
            <Typography variant="h3" component="h1">
              Welcome to EPIDENCE
            </Typography>
            <Typography variant="h5" component="h2" sx={{ mt: 2, mb: 2 }}>
              About
            </Typography>
            <Typography sx={{ mt: 2, mb: 2 }}>
              
            </Typography>
            <Typography sx={{ mt: 2, mb: 2 }}>
              Take a look at our services.
            </Typography>
            <Link 
              href="https://unswseng.atlassian.net/wiki/spaces/SE3Y22G14/overview?homepageId=1382672" 
              target='_blank'
              rel="noopener"
            >
              Confluence Link
            </Link>
          </Box>
        </Modal>
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
                <IconButton 
                  onClick={() =>{
                    handleOpen();
                  }}
                >
                  <HelpOutlineIcon />
                </IconButton>
                <CountyCaseChart selectedFIPS={"17031"}/>
              </CardContent>
            </Card>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
    
  )
}