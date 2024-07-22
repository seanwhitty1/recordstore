const {tag} = require('../models')

// Controller method to get all todos
exports.getAllTags = async (req, res) => {
 try {
 const tags = await tag.findAll();
 res.json(tags);
 } catch (error) {
 res.status(500).json({ error });
 }
};

// Controller method to create a new todo
exports.createTag = async (req, res) => {
  console.log(req.body)
 const {tag_name, description} = req.body;
 try {
 const newTag = await tag.create({tag_name, description});
 res.status(201).json(newTag);
 } catch (error) {
 res.status(500).json({ error});
 }
};
// Controller method to get a todo by ID
exports.getTagById = async (req, res) => {
 const id = req.params.id;
 try {
 const tag = await tag.findByPk(id);
 if (tag) {
 res.json(tag);
 } else {
 res.status(404).json({ error: 'Tag not found' });
 }
 } catch (error) {
 res.status(500).json({ error: 'Internal Server Error' });
 }
};
// Controller method to update a todo by ID
exports.updateTag = async (req, res) => {
 const id = req.params.id;
 const {tag_name, description} = req.body;
 try {
 const tag = await tag.findByPk(id);
 if (tag) {
 tag.tag_name = tag_name;
 tag.description = description
 await tag.save();
 res.json(tag);
 } else {
 res.status(404).json({ error: 'Tag not found' });
 }
 } catch (error) {
 res.status(500).json({ error: 'Internal Server Error' });
 }
};
// Controller method to delete a todo by ID
exports.deleteTag = async (req, res) => {
 const id = req.params.id;
 try {
 const foundTag = await tag.findByPk(id);
 if (foundTag) {
 await foundTag.destroy();
 res.json(foundTag);
 } else {

 res.status(404).json({ error: 'Tag not found' });
 }
 } catch (error) {
console.log(error)
 res.status(500).json({ error: 'Internal Server Error' });
 }
};