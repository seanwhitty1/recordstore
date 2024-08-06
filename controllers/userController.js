const {user, record} = require('../models')

// Controller method to get all todos
exports.getAllUsers = async (req, res) => {
 try {
 res.json(await user.findAll( { include: { all: true, nested: true }}));
 } catch (error) {
  console.log(error)
 res.status(500).json({ error });
 }
};

// Controller method to create a new todo
exports.createUser = async (req, res) => {
 try {
 const newUser = await user.create({...req.body}); 
 res.status(201).json(newUser);
 } catch (error) {
  console.log(error)
 res.status(500).json({ error});
 }
};

exports.getUserCart = async (req, res) => {
   try{
      let {user_id} = req.params
      const foundUser = await user.findByPk(user_id, { include: { all: true, nested: true }});
      res.status(201).json(foundUser.cart.records);

   } catch(error){
      console.log(error)
   }
}

exports.removeRecordFromUserCart = async (req, res) => {
   try{
      let {user_id, id} = req.body
      const foundUser = await user.findByPk(user_id, { include: { all: true, nested: true }});
      const foundRecord = await record.findOne({where: {id}});
      foundUser.cart.removeRecord(foundRecord)
      return res.json(foundUser)
   } catch(error){
      console.log(error)
   }
}
//Controller method for decoding a JWT in local storage and returning user object 
exports.decodeAndReturnUserFromJWT = async (req, res) => {
   try {
      let {token} = req.params
      let decodedUser = await user.decodeJWT(token) //is not a function
      return res.json(decodedUser);

   } catch(err){
      console.log(err)
      return err
   }
}
// Controller method to get a todo by ID
exports.getUserById = async (req, res) => {
 try {
 const foundUser = await user.findByPk(req.params.id, { include: { all: true, nested: true }});
 if (foundUser) {
 res.json(foundUser);
 } else {
 res.status(404).json({ error: 'User not found' });
 }
 } catch (error) {
 res.status(500).json({ error: 'Internal Server Error' });
 }
};

exports.validateUserLogin = async (req, res) => {
   try {
      let {username, password} = req.body
      const foundUser = await user.findOne({where: {username}}, {include: { all: true, nested: true }});
      if(foundUser){
         let validPW = await foundUser.validatePassword(password, foundUser.password)
         if(validPW){
            return res.json(await foundUser.writeJWT(foundUser));     
         } else {
            res.status(500).json({ error: 'Internal Server Error' });
         }
      } else {
          res.status(404).json({ error: 'User not found' });
      }
   } catch(err) {
      console.log(err)
   }
}

exports.getUserbyName = async (req, res) => {
   try{
      let {username} = req.params
      const foundUser = await user.findOne({where: {username}}, {include: { all: true, nested: true }});
      return res.json(foundUser)
      
   } catch(err){
      console.log(err)
   }
}

exports.addItemToUserCart = async (req, res) => {
   try{
      let {user_id, id} = req.body
      const foundUser = await user.findByPk(user_id, { include: { all: true, nested: true }});
      const foundRecord = await record.findOne({where: {id}});
      foundUser.cart.addRecord(foundRecord)
      return res.json(foundUser)
      
   } catch(err){
      console.log(err)
   }
}

// Controller method to update a user by ID
exports.updateUser = async (req, res) => {
 const {username, password, email, age} = req.body
 try {
 let foundUser = await user.findByPk(req.params.id);
 if (foundUser) {
    foundUser.username = username;
    foundUser.email = email;
    foundUser.age = age;
    foundUser.password = password;
 await foundUser.save();
 res.json(foundUser);
 } else {
 res.status(404).json({ error: 'User not found' });
 }
 } catch (error) {
    console.log(error)
 res.status(500).json({ error: 'Internal Server Error' });
 }
};
// Controller method to delete a todo by ID
exports.deleteUser = async (req, res) => {
 try {
 const foundUser = await user.findByPk(req.params.id);
 if (foundUser) {
 await foundUser.destroy();
 res.json(user);
 
 } else {
 res.status(404).json({ error: 'User not found' });
 }
 } catch (error) {
 res.status(500).json({ error: 'Internal Server Error' });
 }
};