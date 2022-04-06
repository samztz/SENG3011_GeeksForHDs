import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { theme } from "./theme.js"
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function BookmarkCard(props) {
    return (
        <Card sx={{ width: 528 }}>
          <CardContent style={{backgroundColor: theme.palette.white.main}}>
                <Grid container justifyContent={'space-between'}>
                    <Typography variant="h5">
                        {props.name}
                    </Typography>
                    <StarIcon style={{ color: "#ffd966" }} />
                </Grid>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" flexWrap>
                    {props.numberOfCases} cases in the last 30 days
                </Typography>
                <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked />} label="Receive weekly summary of reports via email" />
                    <FormControlLabel control={<Switch defaultChecked />} label="Receive weekly predictions via email" />
                </FormGroup>
          </CardContent>
        </Card>
      );
}