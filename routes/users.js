const express = require('express')
const app = express()
app.use(express.json());
const db = require("../db")
const User = require("../models/user")
const router = new express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const SECRET_KEY = "oh-so-secret";
const JWT_OPTIONS = { expiresIn: 60 * 60 };  // 1 hour

router.get('/:username', async function(req, res)  {
    //this will return user data by passing in the user_id as a param
    //middleware required
    //bcrypt required 
  const {username} = req.params;
  const user = await User.get(username)
  user.greet() //this works as an instance method
  console.log("the result of calling class method get user is ", user) //instance of user. 
  return res.json(user)
  
})


router.post("/addnew", async function(req, res){
  const salt = await bcrypt.genSalt(5);
  const passkey = await bcrypt.hash(req.body.passkey, salt) //hashing successfully. 
  const result = await User.addNew({...req.body, passkey, salt})
  return res.json(result)

})

router.post("/gettoken", async function(req, res){
  const {username, password} = req.body
  let payload = {username: username, password:password};
  let token = jwt.sign(payload, SECRET_KEY, JWT_OPTIONS);
  return res.json(token) // working nicely. 
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