const {artist} = require('../models')

// Controller method to get all artists 
exports.getAll = async (req, res) => {
    try {
    return res.json(await artist.findAll( { include: { all: true, nested: true }}));
    } catch (error) {
     console.log(error)
    res.status(500).json({ error });
    }
   };


   // Controller method to get a artist by ID

   exports.getByName = async (req, res) => {
      try{
         const foundArtist = await artist.findOne({where: {artist_name: req.params.artist_name}, include: { all: true, nested: true }});
         return res.json(foundArtist)
         
      } catch(err){
         console.log(err)
      }
   }
   
   // Controller method to update a user by ID
   exports.getByID = async (req, res) => {
      try{
         const foundGenre = await artist.findByPk(req.params.id, {include: { all: true, nested: true }});
         return res.json(foundGenre)
         
      } catch(err){
         console.log(err)
      }
   }

   
 
   // Controller method to delete a todo by ID
  