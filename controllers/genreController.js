const {genre} = require('../models')

// Controller method to get all genres
exports.getAll = async (req, res) => {
    try {
    return res.json(await genre.findAll( { include: { all: true, nested: true }}));
    } catch (error) {
     console.log(error)
    res.status(500).json({ error });
    }
   };


   // Controller method to get a Record by ID

   exports.getByName = async (req, res) => {
      try{
         console.log("running get genre by name", req.params.genre)
         const foundGenre = await genre.findOne({where: {genre_name: req.params.genre}, include: { all: true, nested: true }});
         console.log(foundGenre)
         return res.json(foundGenre)
         
      } catch(err){
         console.log(err)
      }
   }
   
   // Controller method to update a user by ID
   exports.getByID = async (req, res) => {
      try{
         const foundGenre = await genre.findByPk(req.params.id, {include: { all: true, nested: true }});
         return res.json(foundGenre)
         
      } catch(err){
         console.log(err)
      }
   }

   exports.getByGenreName = async (req, res) => {
      try {

      } catch(err){
         console.log(err)
      }
   }
