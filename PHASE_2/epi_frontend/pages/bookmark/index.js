import BookmarkNav from "../components/bookmarkNav";
import { ThemeProvider } from '@mui/material/styles'
import { theme } from "../components/theme.js"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Card from '@mui/material/Card';
import ReportsTable from "../components/reportsTable";
import { TextField } from '@material-ui/core';
import { useState } from "react";

import Card_display from "../components/card.jsx"

function About() {

  const list = ['Australia', 'China', 'Denmark', 'France', 'Greece', 'Italy']

  const cards = list.map((e) => {return <Card_display country={e} /> })

  return (
  
    <ThemeProvider theme={theme}>

      <Box sx={{ display: 'flex' }}>
        <Dashnav pageName={'Bookmarks'} />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <div className="search">
            <TextField
              id="outlined-basic"
            
              variant="outlined"
              fullWidth
              label="Search"
            />
          </div>
          <br/>
          <div className="card_css">
              {cards}
          </div>
      
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default About 

