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
  console.log("inside our route", results)
  //image is null here

  return res.json(results)
  
})

router.get('/genre/:genre', async function(req, res)  {
  //refactored the db query to the model as a static class method
  const {genre} = req.params;
  console.log("here in the route function, genre passed is", genre)
  const results = await Record.getGenre(genre)
  console.log("inside our route", results)
  //image is null here

  return res.json(results)
  
})

router.get('/view/:id', async function(req, res){

  const {id} = req.params
  const result = await Record.getRecord(id)
  console.log("our request parameters:" + id)


  return res.json(result)

})

router.post("/addnew", async function(req, res){
  const {artist, title, genre, price, description, image_src} = req.body;
  const result = await Record.addNew(artist, title, genre, price, description, image_src)
  return res.json(result)

})

// delete route

router.delete("/delete/:id", async function(req, res){
  const id = req.params['id']
  console.log("passed ID is",id )
  const deleted = await Record.deleteRecord(id)
  return res.json(deleted)


  
});


module.exports = router;