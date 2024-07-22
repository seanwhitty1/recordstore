const express = require('express')
const app = express()
app.use(express.json());
const genreController = require('../controllers/genreController');
const router = new express.Router();

router.get('/', genreController.getAll);
router.get('/:id', genreController.getByID)
router.get('/getname/:genre', genreController.getByName)

module.exports = router;
