const {tag, label, genre, artist} = require('../models')
const axios = require('axios')

// Controller method to get all todos
exports.getAll = async (req, res) => {
    console.log("running get all labels")
    try {
    res.json(await label.findAll( { include: { all: true, nested: true }}));
    } catch (error) {
     console.log(error)
    res.status(500).json({ error });
    }
   };
   // Controller method to get a Label by ID
   exports.getByID = async (req, res) => {
      try{
         return res.json(await label.findByPk(req.params.id, {include: { all: true, nested: true }}))
      } catch(err){
         console.log(err)
      }
   }

   exports.getAllFromGenre = async (req, res) => {
      try {
         return res.json(await label.findAll({where: { genre_name: req.params.genre_name}}))

      } catch(err){
         console.log(err)
      }
   }
   
   // Controller method to update a user by ID
   exports.updateLabel = async (req, res) => {
    const {title, genre, price, description} = req.body
    try {
    let foundLabel = await label.findByPk(req.params.id);
    if (foundLabel) {
       foundLabel.title = title;
       foundLabel.genre = genre;
       foundUser.price = price;
       foundUser.description = description;
    await foundLabel.save();
    res.json(foundLabel);
    } else {
    res.status(404).json({ error: 'Label not found' });
    }
    } catch (error) {
       console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
    }
   };
   // Controller method to delete a todo by ID
   exports.deleteLabel = async (req, res) => {
    try {
    const foundLabel = await label.findByPk(req.params.id);
    if (foundLabel) {
    await foundLabel.destroy();
    res.json(foundLabel);
    
    } else {
    res.status(404).json({ error: 'Label not found' });
    }
    } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    }
   };