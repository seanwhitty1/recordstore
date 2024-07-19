//in this file we will define our Node express application
//React is our client side- rendering interface
//React as its a client side operator can not interact with a DB directly
//Node express is an unopinionated server side interface which can act as an intermediate between db and client 
const express = require('express')
const app = require("./app")
app.use(express.json());
const port = 3001;
const {db} = require('./config/dbrelationconfig')

//{ force: true } was previously passed into sync as an argument
//this was dropping db and re-creating db each time npm start ran
//this would be useful in a testing context. 
db.sequelize.sync({alter:true}).then(() => {
  // Database synchronisation is complete
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  });
});

    //"start": "concurrently \"npm run start:frontend\" \"npm run start:backend\"",