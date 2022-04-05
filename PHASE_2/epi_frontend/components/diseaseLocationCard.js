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

export default function DiseaseLocationCard(props) {
    return (
        <Card sx={{ width: 258 }}>
          <CardContent style={{backgroundColor: theme.palette.white.main}}>
                <Grid container justifyContent={'space-between'}>
                    <Typography variant="h5">
                        {props.name}
                    </Typography>
                    {props.bookmark ? <StarIcon style={{ color: "#ffd966" }} /> : <StarBorderIcon style={{ color: "#ffd966" }} />}
                </Grid>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" flexWrap>
                    {props.numberOfCases} cases in the last 30 days
                </Typography>
          </CardContent>
          <CardActions style={{backgroundColor: theme.palette.white.main}}>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      );
}