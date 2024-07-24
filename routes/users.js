const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
//we deconstruct Todo from our models folder. 
//originally tried to do this from '../models/todo which was returning the function but not the class instance
//this lead to confusion but is now somewhat resolved.
// Route to get all users

//registration form comes from "http://localhost:3001/users/addnew",
router.get('/getByName/:username', userController.getUserbyName);
router.post('/addItemToCart', userController.addItemToUserCart)
router.get('/', userController.getAllUsers);
router.get("/getToken")
// Route to create a new user
router.post('/', userController.createUser);

// Route to get a user by ID
router.get('/:id', userController.getUserById);
router.post('/login/validate', userController.validateUserLogin)
router.get('/auth/decodeJWT/:token', userController.decodeAndReturnUserFromJWT)
// Route to update a user by ID
router.put('/:id', userController.updateUser);
// Route to delete a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
