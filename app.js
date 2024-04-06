"use strict";

/** Express app for jobly. */
const express = require("express");
const app = express();
var cors = require('cors');
app.use(express.json());
app.use(cors());




const recordRoutes = require("./routes/records");
const genreRoutes = require("./routes/genres")
app.use("/records", recordRoutes);
app.use("/genres", genreRoutes)


module.exports = app;
