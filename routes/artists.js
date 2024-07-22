

const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');
//we deconstruct Todo from our models folder. 
//originally tried to do this from '../models/todo which was returning the function but not the class instance
//this lead to confusion but is now somewhat resolved.
// Route to get all users

//registration form comes from "http://localhost:3001/users/addnew",
router.get('/name/:artist_name', artistController.getByName);
router.get('/', artistController.getAll);
// Route to create a new user

// Route to get a user by ID
router.get('/:id', artistController.getByID);
// Route to update a user by ID


module.exports = router;
