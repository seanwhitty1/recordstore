const Sequelize = require('sequelize')
//materials is a 1:n relationship
//one item can have several materials 
//tags is a n:n relation ship
//items can have many tags, tags can have many items

module.exports = (sequelize, DataTypes) => {
 const Item = sequelize.define('item', {
 item_name: {
 type: DataTypes.STRING,
 allowNull: false,
 },
 item_type: {
  type: DataTypes.STRING,
  defaultValue: "Clothing"
 },
 image_src: {
  type: DataTypes.STRING,
  defaultValue: "/Users/seanwhitty/Documents/theecultivator/category-placeholder.png" 
  
 },
 alternate_image_src: {
  type: DataTypes.STRING,
  defaultValue: "/Users/seanwhitty/Documents/theecultivator/category-placeholder.png"

 },
 description : {
  type: DataTypes.STRING
 },
 designer: {
  type: DataTypes.STRING
 },
 gender: {
  type: DataTypes.STRING
 }
,
 price: {
 type: DataTypes.INTEGER,
 defaultValue: 33,
 },
 decade: {
   type: DataTypes.INTEGER
 },
 quantity: {
  type: DataTypes.INTEGER,
  defaultValue: 1
},
units_sold: {
  type: DataTypes.INTEGER,
  defaultValue: 0
},

})
return Item;

};

