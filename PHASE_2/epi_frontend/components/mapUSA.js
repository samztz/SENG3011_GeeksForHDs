import CaseReportMap from "./caseReportMap"
import React, { useState, useEffect } from "react";
import Slider from '@mui/material/Slider';

const marks = [
    {
        value: 0,
        label: '0°C',
    },
    {
        value: 20,
        label: '20°C',
    },
    {
        value: 37,
        label: '37°C',
    },
    {
        value: 100,
        label: '100°C',
    },
]

const dataSources = [
    {
        value: 0,
        dataSource: '0°C',
    },
    {
        value: 20,
        dataSource: 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv',
    },
    {
        value: 37,
        dataSource: '37',
    },
    {
        value: 100,
        dataSource: 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/rolling-averages/us-counties-recent.csv',
    },
]

function valuetext(value) {
    return `${value}°C`;
}

export default function MapUSA() {
    const [dataSource, setDataSource] = useState("https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv");
    const handleChange = (event, newValue) => {
        for (let item of dataSources) {
            console.log(item)
            if (item.value == newValue) {
                setDataSource(item.dataSource);
                console.log(dataSource)
            }
            
        }
    };

    return (
        <>
            <Slider
                aria-label="Custom marks"
                defaultValue={20}
                getAriaValueText={valuetext}
                step={10}
                valueLabelDisplay="auto"
                marks={marks}
                onChangeCommitted={handleChange}
            />
            <CaseReportMap dataSource={dataSource} />
        </>
    )
}