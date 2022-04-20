import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker, Annotation, ZoomableGroup } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { csv } from "d3-fetch";
import ReactTooltip from "react-tooltip";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import * as d3 from 'd3';
import { PatternLines } from "@vx/pattern";
import { geoCentroid } from "d3-geo";
import allStates from "./allStates.json";
import hospital from '../data/hospitalandrisk.json';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from "@mui/material";
import { legendColor } from 'd3-svg-legend';

const geoURL = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
const stateURL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"
const COLOR_RANGE = [
    "#c7f0e7",
    "#bbe3db",
    "#9ECCC3",
    "#79BFB4",
    "#44AD9E",
    "#3A8C83",
    "#316F6C",
    "#275053",
    "#1F363D"
];
const RISK_COLOR = [
    "#00c940",
    "#ffda00",
    "#ff9a00",
    "#ff2200",
    "#be1900",
    "#630000"
]

const offsets = {
    VT: [50, -8],
    NH: [34, 2],
    MA: [30, -1],
    RI: [28, 2],
    CT: [35, 10],
    NJ: [34, 1],
    DE: [33, 0],
    MD: [47, 10],
    DC: [49, 21]
};

const LinearGradient = props => {
    const { data } = props;
    const boxStyle = {
      width: '100%',
    };
    const gradientStyle = {
      backgroundImage: `linear-gradient(to right, ${data.colourRange.join(',')})`,
      height: 20
    };

    // map maptype to name
    let names = [
        {
            mapType: 'risk',
            label: 'Risk Level'
        },
        {
            mapType: 'vaccinationsInitiatedRatio',
            label: 'Ratio of population with 1st vaccine dose'
        }
    ]

    let label = data.mapType
    for (let item of names) {
        if (item.mapType == data.mapType) {
            label = item.label;
        }
    }

    return (
      <Box width={'50%'}>
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
                {data.max}
            </Grid>
            
        </Grid>
        <div style={{ ...boxStyle, ...gradientStyle }} className="mt8"></div>
        <Typography>{label}</Typography>
      </Box>
    );
};

const CaseReportMap = () => {
    const [data, setData] = useState([]);
    const [isMounted,setIsMounted] = useState(false); // Need this for the react-tooltip
    const [mapType, setMapType] = useState('risk');

    // NOTE: maybe have array to map keyword to data e.g. if word is risk, map risk data, if hospital beds, map hospital beds

    useEffect(() => {
        setData(hospital);
        setIsMounted(true);
    }, [hospital]);

    function getMaxValue() {
        return d3.max(data, item => item[mapType])
    }

    function getMinValue() {
        return d3.min(data, item => item[mapType])
    }

    const riskColorScale = d3.scaleQuantize()
        .domain([getMinValue(), getMaxValue()])
        .range(RISK_COLOR);

    const colorScale = d3.scaleQuantile()
        .domain([getMinValue(), d3.quantile(data, 0.25, item => item[mapType]), d3.median(data, item => item[mapType]), d3.quantile(data, 0.75, item => item[mapType]), getMaxValue()])
        .range(COLOR_RANGE);

    const gradientData = {
        colourRange: mapType == 'risk' ? RISK_COLOR : COLOR_RANGE,
        results: data,
        min: getMinValue(),
        max: getMaxValue(),
        mapType: mapType
    };

    const [tooltipContent, setTooltipContent] = useState('');
    const onMouseEnter = (geo, cur) => {
        return () => {
            setTooltipContent(`${geo.properties.name}: ${cur[mapType] || 'unknown'}`);
        };
    };

    const onMouseLeave = () => {
        setTooltipContent('');
    };

    // handle clicking on county
    const [county, setCounty] = useState('');
    const [zoom, setZoom] = useState(1);
    const [center, setCenter] = useState([0, 0]);

    const handleCountyClick = (geography, projection, path) => event => {
        const centroid = projection.invert(path.centroid(geography));
        setCenter(centroid);
        setZoom(8);
        county == geography ? setCounty('') : setCounty(geography);
    };

    function countyColour(cur, mapType) {
        if (mapType == 'risk') {
            return riskColorScale(cur[mapType])
        } else if (mapType in cur && cur[mapType] != null) {
            return colorScale(cur[mapType])
        } else {
            return "#f3f3f3";
        }
    }

    const handleMapChange = (event) => {
        setMapType(event.target.value);
        //console.log(mapType)
    };

    return (
        <>
        <ComposableMap projection="geoAlbersUsa" style={{ height: '100%', backgroundColor: '#30bfe3' }}>
            <ZoomableGroup center={center} zoom={zoom}>
                <Geographies geography={geoURL}>
                    {({ geographies, projection, path }) =>
                    geographies.map(geo => {
                        const cur = data.find(s => s.fips === geo.id);
                        return (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            stroke={county == geo ? "black" : "#FFFFFF"} 
                            strokeWidth={0.4}
                            fill={cur ? countyColour(cur, mapType) : "blue"}
                            onMouseEnter={onMouseEnter(geo, cur)}
                            onMouseLeave={onMouseLeave}
                            onClick={handleCountyClick(geo, projection, path)}
                            style={{
                                default: { outline: "none" },
                                hover: { outline: "none" },
                                pressed: { outline: "none" },
                            }}
                        />
                        );
                    })
                    }
                </Geographies>
                <Geographies geography={stateURL}>
                    {({geographies}) => (
                        <>
                            {geographies.map(geo => {
                                return (<Geography key={geo.rsmKey} geography={geo} stroke={"#FFFFFF"} fill={'none'} strokeWidth={0.7} />);
                            })}
                            {geographies.map(geo => {
                                const centroid = geoCentroid(geo);
                                const cur = allStates.find(s => s.val === geo.id);
                                return (
                                    <g key={geo.rsmKey + "-name"}>
                                    {cur &&
                                        centroid[0] > -160 &&
                                        centroid[0] < -67 &&
                                        (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                                        <Marker coordinates={centroid}>
                                            <text y="2" fontSize={14} textAnchor="middle">
                                                {cur.id}
                                            </text>
                                        </Marker>
                                        ) : (
                                        <Annotation
                                            subject={centroid}
                                            dx={offsets[cur.id][0]}
                                            dy={offsets[cur.id][1]}
                                        >
                                            <text x={4} fontSize={14} alignmentBaseline="middle">
                                                {cur.id}
                                            </text>
                                        </Annotation>
                                        ))}
                                    </g>
                                );
                            })}
                        </>
                    )}
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', mt:1 }}>
            <LinearGradient data={gradientData} />
            <Box sx={{ flexGrow: 1 }}>
                <FormControl sx={{ m: 1, mb: 0, width: '100%' }}>
                    <InputLabel id="demo-simple-select-helper-label">Map Type</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={mapType}
                    label="Map Type"
                    onChange={handleMapChange}
                    >
                        <MenuItem value={'risk'}>Risk Level</MenuItem>
                        <MenuItem value={'vaccinationsInitiatedRatio'}>Vaccinations</MenuItem>
                        <MenuItem value={'Staffed All Beds [Per 1000 Adults (20+)]'}>Staffed All Beds [Per 1000 Adults (20+)]</MenuItem>
                        <MenuItem value={'Staffed ICU Beds [Per 1000 Adults (20+)]'}>Staffed ICU Beds [Per 1000 Adults (20+)]</MenuItem>
                        <MenuItem value={'Licensed All Beds [Per 1000 Adults (20+)]'}>Licensed All Beds [Per 1000 Adults (20+)]</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            
        </Box>
        
        {isMounted && <ReactTooltip>{tooltipContent}</ReactTooltip>}
        </>
    );
};

export default CaseReportMap;