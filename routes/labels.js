

const express = require('express');
const router = express.Router();
const labelController = require('../controllers/labelController');


router.get('/', labelController.getAll);
router.get('/:id', labelController.getByID);
router.delete('/:id', labelController.deleteLabel);
router.post('/change_thumb/:id', labelController.changeThumb)

// Route to update a user by ID
module.exports = router;
