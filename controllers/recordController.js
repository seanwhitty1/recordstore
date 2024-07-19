const {item, tag, sequelize, record, genre, artist} = require('../models')

// Controller method to get all todos
exports.getAllRecords = async (req, res) => {
    console.log("+++++whatz is record",record) // undefined
    try {
    res.json(await record.findAll( { include: { all: true, nested: true }}));
    } catch (error) {
     console.log(error)
    res.status(500).json({ error });
    }
   };

exports.createRecord = async (req, res) => {

      try {

      let newRecord = await record.create(req.body)
      console.log("+++++++++++++", newRecord) // working
      let newArtist = await artist.findOrCreate({where: { artist_name: req.body.artist_name}})
      console.log("newwwww artist", newArtist) // returns artist class instance... 
      newRecord.addArtist(newArtist[0]) // is not a founctionm
      for(genre_name of req.body.genres.split(" ")){
       let newGenre =  await genre.findOrCreate({
         where: { genre_name: genre_name }
         })  
         newRecord.addGenre(newGenre[0])
     }
  
     res.status(201).json(newRecord);
      }
     
      catch (error) {
      console.log("what is the error", error)
      res.status(500).json({error});
      }
     };
  
   // Controller method to get a Record by ID

   exports.getByTitle = async (req, res) => {
      try{
         let {title} = req.params
         const foundRecord = await record.findOne({where: {title}}, {include: { all: true, nested: true }});

         return res.json(foundRecord)
         
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