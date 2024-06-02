const express = require('express')
const app = express()
app.use(express.json());
const Artist = require("../models/artist.js")
const router = new express.Router();


router.get('/', async function(req, res)  {
  const results = await Artist.getAll()
  console.log("inside our route", results)
  return res.json(results)
  
})

router.get('/:artist_name', async function(req, res)  {
    const {artist_name} = req.params
    const results = await Artist.getAllReleasesFromArtist(artist_name);
    console.log("inside our route", results)
    return res.json(results)
    
  })

  module.exports = router;


