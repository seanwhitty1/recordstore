"use strict";

/** Express app for jobly. */
const express = require("express");
const app = express();
var cors = require('cors');
app.use(express.json());
app.use(cors());




const recordRoutes = require("./routes/records");
const genreRoutes = require("./routes/genres")
const artistRoutes = require("./routes/artists")
app.use("/records", recordRoutes);
app.use("/genres", genreRoutes)
app.use("/artists", artistRoutes)


module.exports = app;
