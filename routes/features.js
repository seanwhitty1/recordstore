const express = require('express')
const app = express()
app.use(express.json());
const featureController = require('../controllers/featureController');
const router = new express.Router();

router.get('/', featureController.getAll);
//router.get('/top', genreController.getAllTop10)
router.get('/:id', featureController.getByID)
router.get('/getname/:genre', featureController.getByName)

module.exports = router;
