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
  const r = await Record.addNew(req.body)
  write('../records.csv',['artist','title','genre','price','description','image_src'],req.body)
  console.log("added a new record, here should be an instance", r) 
  return res.json(r)

})



// delete route

router.delete('/delete/:id', async function(req, res){

  const {id} = req.params
  console.log("hitting our delete route, id is ", id)
  const record = await Record.getRecord(id) //undefined
  console.log("what is record", record)
  await record.remove()
  return res.json({msg:'deleted!'})

})

router.put("/update/:id", async function(req,res){
  const id = req.params['id']
  Record.updateRecord(req.body,id)
})


module.exports = router;