const express = require('express')
const app = express()
app.use(express.json());
const db = require("../db")
const Record = require("../models/record")
const router = new express.Router();

// respond with "hello world" when a GET request is made to the homepage
router.get('/', async function(req, res)  {
  //refactored the db query to the model as a static class method
  const results = await Record.getAll()

  return res.json(results)
  
})

router.get('/view/:id', async function(req, res){

  const {id} = req.params
  const result = await Record.getRecord(id)
  console.log("our request parameters:" + id)


  return res.json(result)

  
  //return res.json(results)
})

router.post("/addnew", async function(req, res){
  //destructuring our json body. 
  //this now works. 
  const {artist, title, genre, price, description, image_url} = req.body;
  console.log(req.body)

  const result = await Record.addNew(artist, title, genre, price, description, image_url)
  //here we need to either add a new genre, or link the many to many relationship.
  
  //lets create a check to see if 


  return res.json(result)

  


})

module.exports = router;