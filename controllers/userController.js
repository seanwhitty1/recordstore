const {user} = require('../models')

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
            console.log("its a valid password")
            //here we need to generate our token... we could make it an instance method maybe?
            let userToken = await foundUser.writeJWT(foundUser)
            console.log("returned usertoken wthin validateUserLogin", userToken)
            return res.json(userToken);     
         } else {
            console.log("non valid")
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
      console.log("inside getuserby name what isname", username)
      const foundUser = await user.findOne({where: {username}}, {include: { all: true, nested: true }});
      console.log("inside getUserbyName", foundUser)
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