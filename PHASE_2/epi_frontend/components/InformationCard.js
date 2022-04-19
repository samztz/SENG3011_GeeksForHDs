import { theme } from "../components/theme.js";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CountyCaseChart from "./CountyCaseChart";
import { Box } from "@mui/material";
import { border, borderRadius } from "@mui/system";

const RenderBox = (props) => {
    const { child } = props;
    return (
        <Box
            sx={{
                width: "100%",
                borderRadius: 5,
            }}
        >
            {child}
        </Box>
    );
};

const InformationCard = (props) => {
    const { currentCounty, handleOpen } = props;
    
    return (
        <Card
            sx={{ minWidth: "100%", minHeight: "100%" }}
            style={{ backgroundColor: theme.palette.white.main }}
        >
            <CardContent>
                <Typography variant="h5" component="div">
                    INFO ABOUT HOW TO USE WEBSITE GOES HERE ALSO CHARTS
                    DISPLAYED HERE???
                </Typography>
                <IconButton
                    onClick={() => {
                        handleOpen();
                    }}
                >
                    <HelpOutlineIcon />
                </IconButton>
                {currentCounty === null ? (
                    <p>Default card</p>
                ) : (
                    <div
                        style={{
                            "width": "100%",
                            "background-color": "white",
                            "border-radius": "5px",
                            "box-shadow": "2px 2px 5px #888888"
                        }}
                    >
                        <CountyCaseChart currentCounty={currentCounty} />
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default InformationCard;
