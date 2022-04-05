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
          <DashNav />
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
          >
              <Box>
            <Card>
              <CardContent style={{backgroundColor: theme.palette.white.main}}>
                <Typography variant="h4" fontWeight="fontWeightBold" sx={{mb:2}}>Reports</Typography>
                <Carousel >
            {
                
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
           </Carousel>
              </CardContent>
            </Card>
            
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