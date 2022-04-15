import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { csv } from "d3-fetch";
import ReactTooltip from "react-tooltip";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import * as d3 from 'd3';

const geoURL = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
const stateURL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"
const COLOR_RANGE = [
    "#ffedea",
    "#ffcec5",
    "#ffad9f",
    "#ff8a75",
    "#ff5533",
    "#e2492d",
    "#be3d26",
    "#9a311f",
    "#782618"
];

const LinearGradient = props => {
    const { data } = props;
    const boxStyle = {
      width: 500,
      margin: 'auto'
    };
    const gradientStyle = {
      backgroundImage: `linear-gradient(to right, ${data.colourRange.join(',')})`,
      height: 20
    };
    return (
      <Box width={500}>
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <Grid item>
                {data.min}
            </Grid>
            <Grid item>
                {d3.max(data.results, function(d) {return d.cases})}
            </Grid>
            
        </Grid>
        <div style={{ ...boxStyle, ...gradientStyle }} className="mt8"></div>
      </Box>
    );
  };

const CaseReportMap = () => {
    const [data, setData] = useState([]);
    const [isMounted,setIsMounted] = useState(false); // Need this for the react-tooltip

    useEffect(() => {
        // https://www.bls.gov/lau/
        csv("https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv", function(d) {
            d.cases = +d.cases;
            return d;
        })
        .then(counties => {
            setData(counties);
        });
        setIsMounted(true);
    }, []);

    const colorScale = scaleQuantile()
    .domain(data.map(d => d.cases))
    .range(COLOR_RANGE);

    const gradientData = {
        colourRange: COLOR_RANGE,
        results: data,
        min: 0,
        max: data.reduce((max, item) => (item.cases > max ? item.cases : max), 0)
    };

    const [tooltipContent, setTooltipContent] = useState('');
    const onMouseEnter = (geo, cur = { cases: 'NA' }) => {
        return () => {
            setTooltipContent(`${geo.properties.name}: ${cur.cases} cases`);
        };
    };

    const onMouseLeave = () => {
        setTooltipContent('');
    };

    return (
        <>
        <LinearGradient data={gradientData} />
        <ComposableMap data-tip="" projection="geoAlbersUsa">
            <Geographies geography={geoURL}>
                {({ geographies }) =>
                geographies.map(geo => {
                    const cur = data.find(s => s.fips === geo.id);
                    return (
                    <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={cur ? colorScale(cur.cases) : "#EEE"}
                        onMouseEnter={onMouseEnter(geo, cur)}
                        onMouseLeave={onMouseLeave}
                    />
                    );
                })
                }
            </Geographies>
            <Geographies geography={stateURL}>
                {({geographies}) => geographies.map(geo => {
                    return (<Geography key={geo.rsmKey} geography={geo} stroke={"#FFFFFF"} fill={'none'} />);
                })}
            </Geographies>
        </ComposableMap>
        {isMounted && <ReactTooltip>{tooltipContent}</ReactTooltip>}
        </>
    );
};

export default CaseReportMap;