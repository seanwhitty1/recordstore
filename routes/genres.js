const express = require('express')
const app = express()
app.use(express.json());
const db = require("../db")
const Genre = require("../models/genres")
const router = new express.Router();

// respond with "hello world" when a GET request is made to the homepage
router.get('/', async function(req, res)  {
  //refactored the db query to the model as a static class method
  const results = await Genre.getAll()

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
  const {genre_name, details} = req.body;

  const result = await Genre.addNew(genre_name,details)

  return res.json(result)

  


})

module.exports = router;