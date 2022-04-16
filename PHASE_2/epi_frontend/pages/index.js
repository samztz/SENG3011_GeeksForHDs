import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar.js'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from "../components/theme.js"
import MapUSA from '../components/mapUSA'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <MapUSA />
          </Box>
          
        </Box>
      </Box>
    </ThemeProvider>
    
  )
}