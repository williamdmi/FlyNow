const cors = require("cors");
const path = require("path");
const express = require("express");

const app = express();
const root = path.join();
const portHttp = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(root));

app.listen(portHttp, async () => {
    console.log("Hosted: http://localhost:" + portHttp);
});

