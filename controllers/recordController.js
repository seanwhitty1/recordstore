const {item, tag, sequelize, record, genre, artist} = require('../models')
const axios = require('axios')

// Controller method to get all todos
exports.getAllRecords = async (req, res) => {
    try {
    res.json(await record.findAll( { include: { all: true, nested: true }}));
    } catch (error) {
     console.log(error)
    res.status(500).json({ error });
    }
   };

exports.createRecord = async (req, res) => {
      try {
         let discogsID = await axios.get(`https://api.discogs.com/database/search?title=${req.body.title}&key=TOowIbaZcuVVCOslftjB&secret=ZHxMSFhhcAJNmasBMrBsvOXakNIcgGxr`)
         const discogsRecord = await axios.get('https://api.discogs.com/releases/' + discogsID.data.results[0].id)
         req.body.tracklist = []
         for (trackObject of discogsRecord.data.tracklist){
            let trackItem = {...trackObject}
           req.body.tracklist.push(trackItem)
            /**tracklistItem: [
[1]   [ 'position', 'D3' ],
[1]   [ 'type_', 'track' ],
[1]   [ 'artists', [ [Object] ] ],
[1]   [ 'title', '97-Drop-Outtro' ],
[1]   [ 'extraartists', [ [Object] ] ],
[1]   [ 'duration', '1:58' ]
[1] ] */
         }
    
      let newRecord = await record.create(req.body)
      let newArtist = await artist.findOrCreate({where: { artist_name: req.body.artist_name}})
      newRecord.addArtist(newArtist[0]) // is not a founctionm
      for(genre_name of req.body.genres.split(",")){
       let newGenre =  await genre.findOrCreate({
         where: { genre_name: genre_name }
         })  
         newRecord.addGenre(newGenre[0])
     }

     for(tag_name of req.body.tags.split(" ")){
      let newTag =  await tag.findOrCreate({
        where: { tag_name: tag_name }
        })  
        newRecord.addTag(newTag[0])
    }
  
     res.status(201).json(newRecord);
      }
      catch (error) {
      console.log(error)
      res.status(500).json({error});
      }
     };
  
   // Controller method to get a Record by ID
   exports.getByID = async (req, res) => {
      try{
         return res.json(await record.findByPk(req.params.id, {include: { all: true, nested: true }}))
      } catch(err){
         console.log(err)
      }
   }

   exports.getAllFromGenre = async (req, res) => {
      console.log("running get all from genre from record controller", req.params.genre_name)
      try {
         return res.json(await record.findAll({where: { genre_name: req.params.genre_name}}))

      } catch(err){
         console.log(err)
      }
   }
   
   // Controller method to update a user by ID
   exports.updateRecord = async (req, res) => {
    const {title, genre, price, description} = req.body
    try {
    let foundRecord = await record.findByPk(req.params.id);
    if (foundRecord) {
       foundRecord.title = title;
       foundRecord.genre = genre;
       foundUser.price = price;
       foundUser.description = description;
    await foundRecord.save();
    res.json(foundRecord);
    } else {
    res.status(404).json({ error: 'Record not found' });
    }
    } catch (error) {
       console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
    }
   };
   // Controller method to delete a todo by ID
   exports.deleteRecord = async (req, res) => {
    try {
    const foundRecord = await record.findByPk(req.params.id);
    if (foundRecord) {
    await foundRecord.destroy();
    res.json(foundRecord);
    
    } else {
    res.status(404).json({ error: 'Record not found' });
    }
    } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    }
   };