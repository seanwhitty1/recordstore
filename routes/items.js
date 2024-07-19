const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
//we deconstruct Todo from our models folder. 
//originally tried to do this from '../models/todo which was returning the function but not the class instance
//this lead to confusion but is now somewhat resolved.
// Route to get all users

//registration form comes from "http://localhost:3001/users/addnew",

router.get('/', itemController.getAllItems);
// Route to create a new record
router.post('/', itemController.createItem);

// Route to update a record by ID
router.put('/:id', itemController.updateItem);
// Route to delete a record by ID


module.exports = router;