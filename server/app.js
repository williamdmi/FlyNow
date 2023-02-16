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


app.listen(portHttp, async () => {
    console.log("Hosted: http://localhost:" + portHttp);
});

app.get("/api/flight/search", async (req, res) => {
    console.log("sending clean data");
    res.json(clean_data);
});

function cleanTheData(raw_data) {
    let clean_data = [];
    for (let i = 0; i < raw_data.length; i++) {
        let legs = [];
        raw_data[i]["Segments"][0]["Legs"].forEach(element => {
            legs.push(new Leg(
                element["DeparturePoint"],
                element["ArrivalPoint"],
                element["FlightNumber"],
                element["AirlineName"],
                element["AirlineCode"]
            ));
        });
        const segment = new Segment(
            legs,
            raw_data[i]["Segments"][0]["SegmentDuration"],
            raw_data[i]["Segments"][0]["ValidatingCarrier"]
        );
        const data = new CleanData(
            raw_data[i]["ID"],
            segment,
            raw_data[i]["AveragePrice"],
            raw_data[i]["CurrencySymbol"]
        );
        clean_data.push(data);
    }
    return clean_data;
}