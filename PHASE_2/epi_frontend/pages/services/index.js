import DashNav from "../../components/dashNav";
import { Button } from "@mui/material";
import { useRouter } from 'next/router'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from "../../components/theme.js"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Carousel from 'react-material-ui-carousel'
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';


function Vis() {

    

    var items = [
        {
            name: "Heat Map",
            description: "des",
            image: "https://www.scnsoft.com/data-analytics/types-of-charts/heat-map.svg",
            route: "/heatmap"
        },
        {
            name: "Line Charts",
            description: "des",
            image : "https://www.scnsoft.com/data-analytics/types-of-charts/line-chart.svg",
            route: "/linechart"
        
        },
        {
            name: "Symbol Map",
            description: "des",
            image: "https://www.scnsoft.com/data-analytics/types-of-charts/symbol-map.svg",
            route: "/symbol-map"
        }
    ]

    return (
        <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
          <DashNav pageName = "Services"/>
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
          >

              <Box>
              <Toolbar />
            <Card sx={{ mb: 2, minWidth: '100%' }}>
              <CardContent style={{backgroundColor: theme.palette.white.main}}>
                <Typography variant="h4" fontWeight="fontWeightBold" sx={{mb:2}}>
                    Visualisations
                </Typography>
                <Carousel >
            {
                
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
           </Carousel>
              </CardContent>
            </Card>
            
            <Box>
            <Card sx={{ mb: 2, minWidth: '100%' }}>
                <CardContent style={{backgroundColor: theme.palette.primary.contrastText}}>
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                    <Grid item container direction="column" xs={6} md={2}>
                    <Button variant='contained'>
                Get Visualisations
            </Button>
                    </Grid>
                  <Grid item container direction="column" alignItems="center" xs={6} md={9}>
                    <Typography variant="h9" fontWeight="fontWeightBold" sx={{mb:1}}>
                    Epidence is ready to help you visualize data and capture real value from it to improve your models. You can look into the example visualisation and reach out to our service to get yours done.
                    </Typography>
            
                  </Grid>
                  </Grid>
                </CardContent>
            </Card>
            </Box>
            <Box>
            <Card sx={{ mb: 2, minWidth: '100%' }}>
              <CardContent style={{backgroundColor: theme.palette.white.main}}>
                <Typography variant="h4" fontWeight="fontWeightBold" sx={{mb:2}}>
                    Predictions
                </Typography>
               
              </CardContent>
            </Card>
            </Box>
          </Box>
          </Box>
          
        </Box>
        
      </ThemeProvider>
    );
  }


  
function Item(props)
{
    const router = useRouter()
    
    const handleClick = e => {
        e.preventDefault()
        router.push('/linechart')
      }

    return (
        <Container>
        <Box
        component="img"
        sx={{
          height: 466,
          maxHeight: { xs: 466, md: 1000 },
        }}
        alt="The house from the offer."
        src={props.item.image}
      />
    <Box sx = {{wight: 'background', height: '100%',}}>
        
          <Typography gutterBottom variant="h" component="h2">
            {props.item.name}
          </Typography>
          <Typography>
            {props.item.description}
          </Typography>
          <Button variant='contained' onClick={e => {
        e.preventDefault()
        router.push(props.item.route)
      }}>
                Explore
            </Button>
    </Box>
    </Container>
    )}

      
export default Vis;