import { theme } from "../components/theme.js";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CountyCaseChart from "./CountyCaseChart";
import CountyDetailCard from "./CountyDetailCard";
import { Box } from "@mui/material";
import { border, borderRadius } from "@mui/system";
import { json } from "d3-fetch";

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
    const dateNow = new Date();

    return (
        <Card
            sx={{ minWidth: "100%", minHeight: "100%" }}
            style={{ backgroundColor: theme.palette.white.main }}
        >
            <CardContent>
                {currentCounty === null ? (
                    <div>
                        <Typography variant="h5" component="div">
                            INFO ABOUT HOW TO USE WEBSITE GOES HERE ALSO CHARTS
                            DISPLAYED HERE???
                        </Typography>
                        <p>Default card</p>
                    </div>
                ) : (
                    <div>
                        <div
                            style= {{
                                display: 'flex',
                                "flex-direction": 'column',
                                "align-items":'center'
                            }}
                        >
                            <Typography variant="h4">
                                <b>{currentCounty.properties.name}</b> County
                            </Typography>
                            <p style={{margin:0}}>Updated on {dateNow.getUTCDate()}/{dateNow.getUTCMonth()}/{dateNow.getUTCFullYear()}</p>
                        </div>
                        <CountyDetailCard currentCounty={currentCounty} />
                        <div
                            style={{
                                width: "100%",
                                "backgroundColor": "white",
                                "borderRadius": "5px",
                                "boxShadow": "2px 2px 5px #888888",
                            }}
                        >
                            <CountyCaseChart currentCounty={currentCounty} />
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default InformationCard;
