const Sequelize = require('sequelize');
const db = new Sequelize('recordsequel', 'seanwhitty', 'password', {
 host: 'localhost',
 dialect: 'postgres', // Change to your database type
});


exports.db = db;

