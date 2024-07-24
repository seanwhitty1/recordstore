"use strict";
const express = require("express");
const app = express();
var cors = require('cors');
app.use(express.json());
app.use(cors());
const recordRoutes = require("./routes/records");
const itemRoutes = require("./routes/items");
const genreRoutes = require("./routes/genres")
const artistRoutes = require("./routes/artists")
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/authorization")
const cartRoutes = require("./routes/carts")
app.use("/records", recordRoutes);
app.use("/carts", cartRoutes);
app.use("/items", itemRoutes)
app.use("/genres", genreRoutes)
app.use("/artists", artistRoutes)
app.use("/users", userRoutes)
app.use("/authorization", authRoutes)

module.exports = app;
