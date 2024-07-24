const {user, cart, item} = require('../models')

// Controller method to get all carts
exports.getAll = async (req, res) => {
   try {
   const carts = await cart.findAll({ include: { all: true, nested: true }});
   res.json(carts);
   } catch (error) {
    console.log(error)
   res.status(500).json({ error });
   }
  };
  


// Controller method to get a cart by userName
exports.addItemToUsersCart = async (req, res) => {
let foundCart = cart.findOne({where: {user: req.params.genre}, include: { all: true, nested: true }});
}


// Controller method to update a cart by ID
exports.addItemToCart = async (req, res) => {
 const id = req.params.id;

 
 try {

 let foundCart = await cart.findByPk(id);
 if (foundCart) {
    let newItem = await item.create(req.body)
    foundCart.addItem(newItem)

 res.json(foundCart);
 } else {
 res.status(404).json({ error: 'Cart not found' });
 }
 } catch (error) {
    console.log(error)
 res.status(500).json({ error: 'Internal Server Error' });
 }
};
