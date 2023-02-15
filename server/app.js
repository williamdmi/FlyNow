const cors = require("cors");
const path = require("path");
const express = require("express");
const fs = require('fs');
const CleanData = require("./CleanData.js").CleanData;

const app = express();
const root = path.join();
const portHttp = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(root));

const data = JSON.parse(fs.readFileSync('./Raw_data/Raw_data OW.json'));
console.log(data);
console.log(data.length);
for(let i = 0; i <data.length; i++){

}


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