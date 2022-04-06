import * as React from 'react';
import DashNav from "../../components/dashNav";
import { ThemeProvider } from '@mui/material/styles'
import { theme } from "../../components/theme.js"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ReportsTable from "../../components/reportsTable";
import FilterDropdowns from "../../components/filterDropdowns";
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';

function UserProfile() {
  return (
    <Card sx={{mb:2, width: '50%'}}>
      <CardHeader title="Personal Details" />
      <CardContent>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={6}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                gridRowGap: 10,
              }}
            >
              <Avatar src={'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'} 
              sx={{ height: 200, width: 200 }} />
              <Grid container spacing={1} alignContent="center">
                <Grid item xs={6}>
                  <Button color="secondary" variant="contained" fullWidth>
                    Upload
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" color="secondary" fullWidth>
                    Remove
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={6}>
              <Grid container justifyContent={'center'} spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="John Doe"
                    name="firstName"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="hello@gmail.com"
                    name="lastName"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Scientist"
                    name="email"
                    variant="outlined"
                  />
                </Grid>
              
              
            </Grid>
            <Grid container item xs={12} justifyContent="flex-end" sx={{mt:2}}>
                <Button variant="contained" color="secondary">
                  Edit
                </Button>
              </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function AccountSettings() {
  return (
    <Card sx={{mb:2, width: '50%', ml:2}}>
      <CardHeader title="Account" />
      <CardContent>
        <Grid container justifyContent="space-between" spacing={3}>
          <Grid item>
            <Typography variant="h6">Reset Password</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" href="/verify">
              Reset Password
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Delete Account</Typography>
                <Typography color="red" variant="subtitle2">
                  WARNING: Account deletion is permanent and cannot be undone.
                  All data, including bookmarks, will be deleted.
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Grid container alignItems="center" justifyContent="space-between" spacing={3}>
                  <Grid item xs={7}>
                    <TextField
                      id="pwd_confirmation"
                      label="Please Confirm Password"
                      size="small"
                      type="password"
                      fullWidth
                    ></TextField>
                  </Grid>
                  <Grid item justifyContent="left">
                    <Button variant="contained" color="secondary">
                      Delete Account
                    </Button>
                    
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function Profile() {
  return (
    <ThemeProvider theme={theme}>

      <Box sx={{ display: 'flex' }}>
        <DashNav pageName='Home' />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <UserProfile />
            <AccountSettings />
          </Box>
        </Box>
      </Box>
      

    </ThemeProvider>
  );
}

export default Profile 
