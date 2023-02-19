const cors = require("cors");
const path = require("path");
const express = require("express");
const fs = require('fs');
const { CleanData, Segment, Leg } = require("./Classes");

const app = express();
const root = path.join();
const portHttp = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(root));

let clean_data = [];

let raw_data = JSON.parse(fs.readFileSync('./Raw_data/Raw_data OW.json'));
clean_data = clean_data.concat(cleanTheData(raw_data));

raw_data = JSON.parse(fs.readFileSync('./Raw_data/Raw_data OW - 2pax .json'));
clean_data = clean_data.concat(cleanTheData(raw_data));

raw_data = JSON.parse(fs.readFileSync('./Raw_data/Raw_data RT - 2pax .json'));
clean_data = clean_data.concat(cleanTheData(raw_data));

fs.writeFileSync('clean_data.json', JSON.stringify(clean_data));

let [minPrice, maxPrice] = getMinAndMaxPrice(clean_data);
let allAF = getAllAF(clean_data);
let numbersOfStops = getAllNumbersOfStops(clean_data);


app.listen(portHttp, async () => {
    console.log("Hosted: http://localhost:" + portHttp);
});

app.get("/api/flight/search", async (req, res) => {
    console.log("sending clean data");
    res.json(clean_data);
});

app.get("/api/filterOptions", async (req, res) => {
    console.log("sending filter Options");
    res.json([minPrice , maxPrice , allAF , numbersOfStops]);
});

function cleanTheData(raw_data) {
    let clean_data = [];
    for (let i = 0; i < raw_data.length; i++) {
        let legs = [];
        raw_data[i]["Segments"][0]["Legs"].forEach(element => {
            legs.push(new Leg(
                element["DeparturePoint"] || null,
                element["ArrivalPoint"] || null,
                element["FlightNumber"] || null,
                element["AirlineName"] || null,
                element["AirlineCode"] || null
            ));
        });
        const segment = new Segment(
            legs,
            raw_data[i]["Segments"][0]["SegmentDuration"] || null,
            raw_data[i]["Segments"][0]["ValidatingCarrier"] || null
        );
        const data = new CleanData(
            raw_data[i]["ID"] || null,
            segment,
            raw_data[i]["AveragePrice"] || null,
            raw_data[i]["CurrencySymbol"] || null
        );
        clean_data.push(data);
    }
    return clean_data;
}

function getAllAF(clean_data){
    return clean_data.map(element => element["Segments"]["Legs"][0]["AirlineName"]).filter((value, index, self) => self.indexOf(value) === index).sort()
}

function getAllNumbersOfStops(clean_data){
    return clean_data.map(element => element["Segments"]["Legs"].length).filter((value, index, self) => self.indexOf(value) === index).sort()
}

function getMinAndMaxPrice(clean_data) {
    let minPrice = clean_data[0]["AveragePrice"];
    let maxPrice = 0;
    clean_data.forEach(element => {
        if (element["AveragePrice"] > maxPrice) {
            maxPrice = element["AveragePrice"];
        }
        else if (element["AveragePrice"] < minPrice) {
            minPrice = element["AveragePrice"];
        }
    });
    return [minPrice, maxPrice];
}


