import { ThemeProvider } from '@mui/material/styles'
import { theme } from "../../components/theme.js"
import Box from '@mui/material/Box';

import DashNav from '../../components/dashNav.js';

function Predictions() {
    return (
    <ThemeProvider theme={theme}>
        <DashNav pageName='Prediction' />
        <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
            <p>Coming soon...</p>
        </Box>
    </ThemeProvider>
    );
}

export default Predictions;