const express = require('express')
const app = express()
app.use(express.json());
const db = require("../db")
const Record = require("../models/record")
const router = new express.Router();
const write = require('../helpers/writeToCSV')

// respond with "hello world" when a GET request is made to the homepage
router.get('/', async function(req, res)  {
  //refactored the db query to the model as a static class method
  const results = await Record.getAll()
  console.log("in our get all route what is the result", results)
  results.forEach(r => r.intro())
  return res.json(results)
  
})

router.get('/genre/:genre', async function(req, res)  {
  const {genre} = req.params;
  const results = await Record.getGenre(genre)
  return res.json(results)
  
})

router.get('/view/:id', async function(req, res){
  const {id} = req.params
  const result = await Record.getRecord(id)
  return res.json(result)

})

router.post("/addnew", async function(req, res){
  const result = await Record.addNew(req.body)
  write('../records.csv',['artist','title','genre','price','description','image_src'],req.body)
  return res.json(result)

})

// delete route

router.delete("/delete/:id", async function(req, res){
  const id = req.params['id']
  const deleted = await Record.deleteRecord(id)
  return res.json(deleted)
});

router.put("/update/:id", async function(req,res){
  const id = req.params['id']
  Record.updateRecord(req.body,id)

})


module.exports = router;