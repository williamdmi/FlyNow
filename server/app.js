const cors = require("cors");
const path = require("path");
const express = require("express");
const fs = require('fs');

const app = express();
const root = path.join();
const portHttp = 4000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(root));

const data = fs.readFileSync('./Raw_data/Raw_data OW.json');
console.log(JSON.parse(data));

app.listen(portHttp, async () => { 
    console.log("Hosted: http://localhost:" + portHttp);
});

app.get("/api/flight/search", async (req, res) => {
    console.log("sending clean data");

    let cleanData;
    try {
        
    }
    catch (e) {
        console.log(e);
    }   
    res.json(cleanData);
});