import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Link from 'next/link';
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

const drawerWidth = 240;

export default function Navbar() {
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
          <AppBar position="fixed">
            <Toolbar>
                <img src="/Logo_dark.png" alt="logo" width='200' />
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, paddingLeft:'20px' }}>
                    <Link href="/#Home">
                        <Button variant="text" color='white'>Home</Button>
                    </Link>
                    <Link href="/#Features">
                        <Button variant="text" color='white'>Features</Button>
                    </Link>
                    <Link href="/#Pricing">
                        <Button variant="text" color='white'>Pricing</Button>
                    </Link>
                    <Link href="/#About">
                        <Button variant="text" color='white'>About</Button>
                    </Link>
                    <Link href="/#ContactUs">
                        <Button variant="text" color='white'>Contact Us</Button>
                    </Link>
                </Box>
                <Box>
                    <Link href="/signup">
                        <Button variant="outlined" color='white' sx={{m:2}}>Sign Up</Button>
                    </Link>
                    <Link href="/login">
                        <Button variant="contained" color='secondary'>Log In</Button>
                    </Link>
                    
                </Box>
            </Toolbar>
          </AppBar>
        </Box>
    );
}