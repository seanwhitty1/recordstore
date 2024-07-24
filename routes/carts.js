const express = require('express')
const app = express()
app.use(express.json());
const cartController = require('../controllers/cartController');
const router = new express.Router();

router.get('/', cartController.getAll);
//router.get('/:id', cartController.getByID)

module.exports = router;
