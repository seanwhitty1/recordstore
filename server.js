//in this file we will define our Node express application
//React is our client side- rendering interface
//React as its a client side operator can not interact with a DB directly
//Node express is an unopinionated server side interface which can act as an intermediate between db and client 

const express = require('express');
const app = require("./app")
const port = 3001;
app.use(express.json());






app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
});