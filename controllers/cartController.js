const {user, cart, item} = require('../models')

// Controller method to get all todos


// Controller method to get a todo by ID


// Controller method to update a todo by ID
exports.addItemToCart = async (req, res) => {
 const id = req.params.id;
 
 try {

 let foundCart = await cart.findByPk(id);
 console.log("+++++++++++++++*", req.body)
 if (foundCart) {
    console.log("cart found")
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
