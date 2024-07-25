const {item, tag, sequelize} = require('../models')

// Controller method to get all todos
exports.getAllItems = async (req, res) => {
 try {
 const items = await item.findAll({ include: { all: true, nested: true }});
 res.json(items);
 } catch (error) {
  console.log(error)
 res.status(500).json({ error });
 }
};

exports.getAllSoldItems = async (req, res) => {
  try {
  const items = await item.findAll({where: {quantity: 0}});
  res.json(items);
  } catch (error) {
  res.status(500).json({ error })
  }
 };

 exports.getAllLonger10 = async (req, res) => {
  try {
  const items = await item.findAll({where:
    sequelize.where(sequelize.fn('char_length', sequelize.col("item_name")), 9)
    });
  res.json(items);
  } catch (error) {
   console.log(error)
  res.status(500).json({ error })
  }
 };

 exports.udateAllCharLength = async (req, res) => {
  try {
  const items = await item.update({item_name: "tank top"}, {where:
    sequelize.where(sequelize.fn('char_length', sequelize.col("item_name")), 9)
    });
  res.json(items);
  } catch (error) {
   console.log(error)
  res.status(500).json({ error })
  }
 };

// Controller method to create a new todo
exports.createItem = async (req, res) => {
 try {
 const newItem = await item.create({...req.body});
 for(tag_name of req.body.tags.split(" ")){
  let newTag =  await tag.findOrCreate({
    where: { tag_name: tag_name }
    }) 
    newItem.addTag(newTag[0])
}
res.status(201).json(newItem);
 }
 catch (error) {
 res.status(500).json({ error});
 }
};
// Controller method to get item by id 
exports.getItemById = async (req, res) => {
 const id = req.params.id;
 try {
 const foundItem = await item.findByPk(id);
 if (foundItem) {
 res.json(foundItem);
 } else {
 res.status(404).json({ error: 'Item not found' });
 }
 } catch (error) {
 res.status(500).json({ error: 'Internal Server Error' });
 }
};
// Controller method to update a todo by ID
exports.updateItem = async (req, res) => {
 const id = req.params.id;
 const { item_name, price, decade, sold} = req.body;
 try {
 const foundItem = await item.findByPk(id);
 if (foundItem) {
 foundItem.item_name = item_name;
 foundItem.price = price;
 foundItem.decade = decade;
 foundItem.sold = sold;
 await foundItem.save();
 res.json(foundItem);
 } else {
 res.status(404).json({ error: 'Item not found' });
 }
 } catch (error) {
 res.status(500).json({ error: 'Internal Server Error' });
 }
};
// Controller method to delete an item by ID
exports.deleteItem = async (req, res) => {
 const id = req.params.id;
 try {
 const foundItem = await item.findByPk(id);
 if (foundItem) {
 await foundItem.destroy();
 res.json(foundItem);
 } else {
 res.status(404).json({ error: 'Item not found' });
 }
 } catch (error) {
 res.status(500).json({ error: 'Internal Server Error' });
 }
};