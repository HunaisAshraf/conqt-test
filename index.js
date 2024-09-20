const express = require("express");
const connection = require("./config/db");
const getVendorUsers = require("./controller/controllers");

const app = express();

app.get("/api/getVendorUsers", getVendorUsers);

function serverStart() {
  connection.connect();
  app.listen(3001, () => {
    console.log("server started in port 3000");
  });
}

serverStart();
