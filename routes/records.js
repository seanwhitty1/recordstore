const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
//we deconstruct Todo from our models folder. 
//originally tried to do this from '../models/todo which was returning the function but not the class instance
//this lead to confusion but is now somewhat resolved.
// Route to get all users

//registration form comes from "http://localhost:3001/users/addnew",
router.get('/:id', recordController.getByID);
router.get('/', recordController.getAllRecords);
// Route to create a new record
router.post('/', recordController.createRecord);

// Route to update a record by ID
router.put('/:id', recordController.updateRecord);
// Route to delete a record by ID
router.delete('/:id', recordController.deleteRecord);

module.exports = router;