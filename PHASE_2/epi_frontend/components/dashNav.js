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
import { useRouter } from 'next/router';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Link from 'next/link';

const drawerWidth = 240;

export default function DashNav({pageName}) {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    const router = useRouter();

    // set selected
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const buttonProps = (value) => ({
        selected: selectedIndex === value,
        onClick: () => setSelectedIndex(value),
    });

    return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            color='white'
          >
            <Toolbar>
              <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                {pageName}
              </Typography>
              <Link href="/">
                  <Button variant="contained" color='secondary'>Logout</Button>
              </Link>
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
            <Toolbar disableGutters style={{justifyContent:'center', alignContent:'center'}}>
                <img src="/Logo_dark.png" alt="logo" width={drawerWidth - 40} />
            </Toolbar>
            <Divider />
            <List>
                <Link href="/home">
                    <ListItemButton {...buttonProps(0)}>
                        <ListItemText primary="Home" style={{display:'flex', justifyContent:'center'}} primaryTypographyProps={{ color: 'white.main' }} />
                    </ListItemButton>
                </Link>
                    <ListItemButton {...buttonProps(1)}>
                        <Link href="/reports">
                            <ListItemText primary="Reports" style={{display:'flex', justifyContent:'center'}} primaryTypographyProps={{ color: 'white.main' }} />
                        </Link>
                        <ListItemSecondaryAction onClick={handleClick}>
                            {open ? <ExpandLess color="white" /> : <ExpandMore color="white" />}
                        </ListItemSecondaryAction>
                    </ListItemButton>
                
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <Link href="/diseases">
                            <ListItemButton {...buttonProps(2)}>
                                <ListItemText primary="Diseases" style={{display:'flex', justifyContent:'center'}} primaryTypographyProps={{ color: 'white.main' }} />
                            </ListItemButton>
                        </Link>
                        <Link href="/locations">
                            <ListItemButton {...buttonProps(3)}>
                                <ListItemText primary="Locations" style={{display:'flex', justifyContent:'center'}} primaryTypographyProps={{ color: 'white.main' }} />
                            </ListItemButton>
                        </Link>
                    </List>
                </Collapse>
                <Link href="/predictions">
                    <ListItemButton {...buttonProps(4)}>
                        <ListItemText primary="Predictions" style={{display:'flex', justifyContent:'center'}} primaryTypographyProps={{ color: 'white.main' }} />
                    </ListItemButton>
                </Link>
                <Link href="/bookmark">
                    <ListItemButton {...buttonProps(5)}>
                        <ListItemText primary="Bookmarks" style={{display:'flex', justifyContent:'center'}} primaryTypographyProps={{ color: 'white.main' }} />
                    </ListItemButton>
                </Link>
                
            </List>
            <Grid alignItems="flex-end">
                <Grid item style={{position: 'absolute', bottom: 0, width: '100%', display:'flex', justifyContent:'center'}}>
                   <Divider />
                    <List>
                        <Link href="/profile">
                            <ListItemButton {...buttonProps(6)}>
                                <ListItemIcon style={{minWidth:40}}>
                                    <AccountCircleIcon color="white" />
                                </ListItemIcon>
                                <ListItemText primary="Account" primaryTypographyProps={{ color: 'white.main' }} />
                            </ListItemButton>
                        </Link>
                    </List> 
                </Grid>
                
            </Grid>
            
          </Drawer>
        </Box>
    );
}