const {tag, record, genre, artist, label, feature} = require('../models')
const axios = require('axios')

// Controller method to get all Feature
exports.getAllOrders = async (req, res) => {
    console.log("running getAll Features")
 try {
 const features = await feature.findAll();
 res.json(features);
 } catch (error) {
  console.log(error)
 res.status(500).json({ error });
 }
};

// Controller method to create a new Feature
exports.createFeature = async (req, res) => {
  console.log("runningo ur create feature route")
  console.log(req.body)
 try {
 const newFeature = await feature.create();
 res.status(201).json(newFeature);
 } catch (error) {
  console.log(error)
 res.status(500).json({ error});
 }
};
// Controller method to get a Feature by ID
exports.getFeatureById = async (req, res) => {
 const id = req.params.id;
 try {
 const feature = await feature.findByPk(id);
 if (feature) {
 res.json(feature);
 } else {
 res.status(404).json({ error: 'Feature not found' });
 }
 } catch (error) {
 res.status(500).json({ error: 'Internal Server Error' });
 }
};


// Controller method to delete a Feature by ID
exports.deleteFeature = async (req, res) => {
 const id = req.params.id;
 try {
 const foundFeature = await feature.findByPk(id);
 if (foundFeature) {
 await foundFeature.destroy();
 res.json(foundFeature);
 } else {

 res.status(404).json({ error: 'Order not found' });
 }
 } catch (error) {
console.log(error)
 res.status(500).json({ error: 'Internal Server Error' });
 }
};

