const express = require('express')
const app = express()
app.use(express.json());
const db = require("../db")
const User = require("../models/user")
const router = new express.Router();
const write = require('../helpers/writeToCSV')
const bcrypt = require('bcryptjs');




router.get('/:username', async function(req, res)  {
    //this will return user data by passing in the user_id as a param
    //middleware required
    //bcrypt required 
  const {username} = req.params;
  const results = await User.get(username)
  return res.json(results[0])
  
})


router.post("/addnew", async function(req, res){
  const salt = await bcrypt.genSalt(5);
  const passkey = await bcrypt.hash(req.body.passkey, salt) //hashing successfully. 
  const result = await User.addNew({...req.body, passkey, salt})
  return res.json(result)

})

// delete route

router.delete("/delete/:id", async function(req, res){
  const id = req.params['id']
  const deleted = await User.deleteRecord(id)
  return res.json(deleted)
});

router.put("/update/:id", async function(req,res){
  const id = req.params['id']
  User.updateRecord(req.body,id)

})


module.exports = router;