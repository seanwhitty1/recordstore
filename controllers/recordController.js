const {tag, record, genre, artist} = require('../models')
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
         console.log(req.body.title.replace(/\s/g, '+'), req.body.artist_name.replace(/\s/g, '+'))
         let discogsID = await axios.get(`https://api.discogs.com/database/search?title=${req.body.title.replace(/\s/g, '+')}&artist=${req.body.artist_name.replace(/\s/g, '+')}&key=TOowIbaZcuVVCOslftjB&secret=ZHxMSFhhcAJNmasBMrBsvOXakNIcgGxr`)
         const discogsRecord = await axios.get(`https://api.discogs.com/${discogsID.data.results[0].type}s/` + discogsID.data.results[0].id + '?key=TOowIbaZcuVVCOslftjB&secret=ZHxMSFhhcAJNmasBMrBsvOXakNIcgGxr') 
         req.body.images = discogsRecord.data.images
         req.body.tracklist = []
         discogsRecord.data.tracklist.map(trackObject =>  req.body.tracklist.push({...trackObject}))
         let newRecord = await record.create(req.body)
         let newArtist = await artist.findOrCreate({where: { artist_name: req.body.artist_name}})
         newRecord.addArtist(newArtist[0]) 
         for(genre_name of  discogsRecord.data.styles){
         let newGenre =  await genre.findOrCreate({
         where: { genre_name: genre_name }
         })  
         newRecord.addGenre(newGenre[0])
     }

     for(tag_name of discogsRecord.data.styles){
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