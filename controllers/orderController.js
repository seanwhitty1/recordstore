const {order} = require('../models')

// Controller method to get all todos
exports.getAllOrders = async (req, res) => {
    console.log("running getAllOrders")
 try {
 const orders = await order.findAll();
 res.json(orders);
 } catch (error) {
  console.log(error)
 res.status(500).json({ error });
 }
};

// Controller method to create a new todo
exports.createOrder = async (req, res) => {
  console.log("runningo ur create order route")
  console.log(req.body)
 const {userId} = req.body;
 try {
 const newOrder = await order.create({
userId
 });
 res.status(201).json(newOrder);
 } catch (error) {
  console.log(error)
 res.status(500).json({ error});
 }
};
// Controller method to get a todo by ID
exports.getOrderById = async (req, res) => {
 const id = req.params.id;
 try {
 const order = await order.findByPk(id);
 if (order) {
 res.json(order);
 } else {
 res.status(404).json({ error: 'Order not found' });
 }
 } catch (error) {
 res.status(500).json({ error: 'Internal Server Error' });
 }
};
// Controller method to update a todo by ID
exports.updateOrder = async (req, res) => {
 const id = req.params.id;
 const { order_status } = req.body;
 try {
 const order = await order.findByPk(id);
 if (order) {
 order.order_status = order_status
 await order.save();
 res.json(order);
 } else {
 res.status(404).json({ error: 'Order not found' });
 }
 } catch (error) {
 res.status(500).json({ error: 'Internal Server Error' });
 }
};
// Controller method to delete a todo by ID
exports.deleteOrder = async (req, res) => {
 const id = req.params.id;
 try {
 const foundOrder = await order.findByPk(id);
 if (foundOrder) {
 await foundOrder.destroy();
 res.json(foundOrder);
 } else {

 res.status(404).json({ error: 'Order not found' });
 }
 } catch (error) {
console.log(error)
 res.status(500).json({ error: 'Internal Server Error' });
 }
};