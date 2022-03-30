import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Grid, ListItemButton } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';

const drawerWidth = 240;

export default function DashNav() {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            color='secondary'
          >
            <Toolbar>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                Permanent drawer
              </Typography>
              <Button variant="contained">Logout</Button>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: "#1F363D",
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar />
            <Divider />
            <List>
                <ListItemButton>
                    <ListItemText primary="Home" style={{display:'flex', justifyContent:'center'}} primaryTypographyProps={{ color: 'secondary' }} />
                </ListItemButton>
                <ListItemButton onClick={handleClick}>
                    <ListItemText primary="Reports" style={{display:'flex', justifyContent:'center', marginLeft:24}} primaryTypographyProps={{ color: 'secondary' }} />
                    {open ? <ExpandLess color="secondary" /> : <ExpandMore color="secondary" />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton>
                            <ListItemText primary="Diseases" style={{display:'flex', justifyContent:'center'}} primaryTypographyProps={{ color: 'secondary' }} />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText primary="Locations" style={{display:'flex', justifyContent:'center'}} primaryTypographyProps={{ color: 'secondary' }} />
                        </ListItemButton>
                    </List>
                </Collapse>
                <ListItemButton>
                    <ListItemText primary="Predictions" style={{display:'flex', justifyContent:'center'}} primaryTypographyProps={{ color: 'secondary' }} />
                </ListItemButton>
                <ListItemButton>
                    <ListItemText primary="Bookmarks" style={{display:'flex', justifyContent:'center'}} primaryTypographyProps={{ color: 'secondary' }} />
                </ListItemButton>
            </List>
            <Grid alignItems="flex-end">
                <Grid item style={{position: 'absolute', bottom: 0, width: '100%', display:'flex', justifyContent:'center'}}>
                   <Divider />
                    <List>
                        <ListItemButton>
                            <ListItemIcon style={{minWidth:40}}>
                                <AccountCircleIcon color="secondary" />
                            </ListItemIcon>
                            <ListItemText primary="Account" primaryTypographyProps={{ color: 'secondary' }} />
                        </ListItemButton>
                    </List> 
                </Grid>
                
            </Grid>
            
          </Drawer>
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
          >
            <Toolbar />
          </Box>
        </Box>
    );
}