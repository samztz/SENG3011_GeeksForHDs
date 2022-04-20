import { autoType } from "d3";
import Typography from "@mui/material/Typography";
import hospitalAndRisk from "../data/hospitalandrisk.json";
import { flexbox } from "@mui/system";

const DataColumn = (props) => {
    const { fieldName, data, subField } = props;
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                padding: "5px 20px",
                justifyContent: "space-between",
            }}
        >
            <Typography>
                <b>{fieldName} </b>
                {subField && (
                    <span style={{ fontSize: "14px" }}>{subField}</span>
                )}
            </Typography>
            <p style={{ margin: 0 }}>{data}</p>
        </div>
    );
};

const StatusBar = (props) => {
    const { risk } = props;

    let lowStyle = {
        backgroundColor: "#00d474",
        flex: 1,
        borderRadius: "20px 0 0 20px",
    };
    let midStyle= {
        backgroundColor: "#ffc900",
        flex: 1
    }
    let highStyle= {
        backgroundColor: "#FF9600",
        flex: 1,
        borderRadius: "0 20px 20px 0",
    }

    switch (risk) {
        case 0:
            lowStyle.border = '3px solid black'
            break;
        case 1:
            midStyle.border = '3px solid black'
            break;
        case 2:
            highStyle.border = '3px solid black'
            break
        case 3:
            highStyle.border = '3px solid black'
            break
    }

    return (
        <div
            style={{
                display: "flex",
                width: "150px",
                height: "20px",
                margin: "20px",
                borderRadius: "20px",
            }}
        >
            <div style={{ ...lowStyle }} />
            <div style={{ ...midStyle }}/>
            <div style={{ ...highStyle }}/>
        </div>
    );
};

const CountyDetailCard = (props) => {
    const { currentCounty } = props;
    const countyFips = currentCounty.id;
    const data = hospitalAndRisk.find((e) => {
        return e.fips === countyFips;
    });
    console.log(data);
    const spaceBetweenStle = {
        width: "100%",
        display: "flex",
        padding: "5px 20px",
        justifyContent: "space-between",
    };

    const riskLevel = {
        0: "LOW",
        1: "MEDIUM",
        2: "HIGH",
        3: "Very High",
        4: "Unkown"
    };

    return (
        <div
            style={{
                width: "100%",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: "5px",
                boxShadow: "2px 2px 5px #888888",
                margin: "20px 0",
                padding: "10px",
            }}
        >
            <div styles={{ display: "flex" }}>
                <Typography variant="h5">
                    <b>{riskLevel[data.risk]} COVID COMMUNITY LEVEL</b>
                </Typography>
            </div>
            <StatusBar risk={data.risk}/>
            <DataColumn
                fieldName={"Infection Rate"}
                data={data.infectionRate ?? "not provided"}
            />
            <DataColumn
                fieldName={"vaccinationsInitiatedRatio"}
                data={data.vaccinationsInitiatedRatio ?? "not provided"}
            />
            <DataColumn
                fieldName={"Licensed All Beds"}
                subField={"Per 1000 Adults (20+)"}
                data={
                    data["Licensed All Beds [Per 1000 Adults (20+)]"] ??
                    "not provided"
                }
            />
            <DataColumn
                fieldName={"Staffed All Beds"}
                subField={"Per 1000 Adults (20+)"}
                data={
                    data["Staffed All Beds [Per 1000 Adults (20+)]"] ??
                    "not provided"
                }
            />
            <DataColumn
                fieldName={"Staffed ICU Beds"}
                subField={"Per 1000 Adults (20+)"}
                data={
                    data["Staffed ICU Beds [Per 1000 Adults (20+)]"] ??
                    "not provided"
                }
            />
        </div>
    );
};

export default CountyDetailCard;
