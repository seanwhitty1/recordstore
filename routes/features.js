const express = require('express')
const app = express()
app.use(express.json());
const featureController = require('../controllers/featureController');
const router = new express.Router();

router.get('/', featureController.getAll);

router.post('/', featureController.createFeature);


module.exports = router;
