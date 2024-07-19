const {todo} = require('../models')

// Controller method to get all todos
exports.getAllTodos = async (req, res) => {
    console.log("running getAllTodos")
 try {
 const todos = await todo.findAll();
 res.json(todos);
 } catch (error) {
  console.log(error)
 res.status(500).json({ error });
 }
};

// Controller method to create a new todo
exports.createTodo = async (req, res) => {
  console.log("runningo ur create todo route")
  console.log(req.body)
 const { task, percentCompleted, isCompleted } = req.body;
 try {
 const newTodo = await todo.create({
 task,
 percentCompleted,
 isCompleted
 });
 res.status(201).json(newTodo);
 } catch (error) {
  console.log(error)
 res.status(500).json({ error});
 }
};
// Controller method to get a todo by ID
exports.getTodoById = async (req, res) => {
 const id = req.params.id;
 try {
 const todo = await todo.findByPk(id);
 if (todo) {
 res.json(todo);
 } else {
 res.status(404).json({ error: 'Todo not found' });
 }
 } catch (error) {
 res.status(500).json({ error: 'Internal Server Error' });
 }
};
// Controller method to update a todo by ID
exports.updateTodo = async (req, res) => {
 const id = req.params.id;
 const { task, createdDate, percentCompleted, isCompleted } = req.body;
 try {
 const todo = await todo.findByPk(id);
 if (todo) {
 todo.task = task;
 todo.createdDate = createdDate;
 todo.percentCompleted = percentCompleted;
 todo.isCompleted = isCompleted;
 await todo.save();
 res.json(todo);
 } else {
 res.status(404).json({ error: 'Todo not found' });
 }
 } catch (error) {
 res.status(500).json({ error: 'Internal Server Error' });
 }
};
// Controller method to delete a todo by ID
exports.deleteTodo = async (req, res) => {
 const id = req.params.id;
 try {
 const todo = await todo.findByPk(id);
 if (todo) {
 await todo.destroy();
 res.json(todo);
 } else {
 res.status(404).json({ error: 'Todo not found' });
 }
 } catch (error) {
 res.status(500).json({ error: 'Internal Server Error' });
 }
};