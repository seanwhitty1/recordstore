
const Sequelize = require("sequelize")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET_KEY = require("../helpers/keys")

module.exports = (sequelize, DataTypes) => {
  const record = sequelize.define('record', {
    id:{ 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: { 
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      

    },
    images: { 
        type: DataTypes.ARRAY(Sequelize.TEXT),
        defaultValue: [],
       
    },

    tracklist: {
        type: DataTypes.ARRAY(Sequelize.TEXT),
        defaultValue: [],
    }

  

}, { hooks: {
    beforeCreate: async (user) => {
 
    },
    beforeUpdate:async (user) => {
   
    },
    afterCreate:async (user) => {
     
    }
   },

  });

   return record;
  }

