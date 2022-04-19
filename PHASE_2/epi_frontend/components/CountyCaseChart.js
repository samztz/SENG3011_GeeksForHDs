import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const CountyCaseChart = (props) => {
    const { selectedFIPS } = props;
    const [rawCase2022, setRawCase2022] = useState([]);
    const rawCaseURL =
        "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties-recent.csv";
    useEffect(() => {
        csv(rawCaseURL, (d) => {
            return {
                date: new Date(d.date),
                county: d.county,
                state: d.state,
                fips: d.fips,
                cases: d.cases,
                death: d.deaths,
            };
        }).then((result) => {
            setRawCase2022(
                result.filter((data) => {
                    return data.fips === `${selectedFIPS}`;
                })
            );
        });
    }, []);
    
    const roundDown = (data) => {
        let result = data;
        result = result/100;
        result = Math.floor(result);
        result = result * 100
        return result;
    }
    const roundUP = (data) => {
        let result = data;
        result = result/100;
        result = Math.ceil(result);
        result = result * 100
        return result;
    }
    const dateFormatter = date => {
        const formateDate = new Date(date);
        
        return `${formateDate.getUTCDate()}/${formateDate.getUTCMonth()+1}`;
    };

    return (
        <div >
            <p>title</p>
            <LineChart
                width={650}
                height={400}
                data={rawCase2022}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    dataKey="date" 
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={dateFormatter}
                    tickCount={5}
                    hasTick
                />
                <YAxis hasTick tickCount={10} domain={[(dataMin) => roundDown(dataMin), (dataMax) => roundUP(dataMax)]} />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="cases"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </div>
    );
};

export default CountyCaseChart;
