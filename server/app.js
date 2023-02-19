const cors = require("cors");
const path = require("path");
const express = require("express");
const fs = require('fs');
const { CleanData, Segment, Leg } = require("./Classes");

//Basic server configuration
const app = express();
const root = path.join();
const portHttp = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(root));

let clean_data = [];

//Read the data from the 3 available files and clean them
let raw_data = JSON.parse(fs.readFileSync('./Raw_data/Raw_data OW.json'));
clean_data = clean_data.concat(cleanTheData(raw_data));

raw_data = JSON.parse(fs.readFileSync('./Raw_data/Raw_data OW - 2pax .json'));
clean_data = clean_data.concat(cleanTheData(raw_data));

raw_data = JSON.parse(fs.readFileSync('./Raw_data/Raw_data RT - 2pax .json'));
clean_data = clean_data.concat(cleanTheData(raw_data));

//Write the clean data to the local server storage
fs.writeFileSync('clean_data.json', JSON.stringify(clean_data));

//Set variables that will be sent to the client
let [minPrice, maxPrice] = getMinAndMaxPrice(clean_data);
let allAF = getAllAirlines(clean_data);
let numbersOfLegs = getAllNumbersOfLegs(clean_data);

//Listen to the selected port
app.listen(portHttp, async () => {
    console.log("Hosted: http://localhost:" + portHttp);
});

//Send the clean data to the client
app.get("/api/flight/search", async (req, res) => {
    console.log("sending clean data");
    res.json(clean_data);
});

//Set the filter options variables to the client
app.get("/api/filterOptions", async (req, res) => {
    console.log("sending filter Options");
    res.json([minPrice , maxPrice , allAF , numbersOfLegs]);
});

//Get the raw data and return the data as an object array after removing all the unnecessary information
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

//Return an array of unique airline names
function getAllAirlines(clean_data){
    return clean_data.map(element => element["Segments"]["Legs"][0]["AirlineName"]).filter((value, index, self) => self.indexOf(value) === index).sort()
}

//Returns an array of unique number of legs
function getAllNumbersOfLegs(clean_data){
    return clean_data.map(element => element["Segments"]["Legs"].length).filter((value, index, self) => self.indexOf(value) === index).sort()
}

//Returns the minimum and maximum prices
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
