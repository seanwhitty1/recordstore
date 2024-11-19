
const Sequelize = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  const feature = sequelize.define('feature', {
    id:{ 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    type: {
        allowNull: true,
        type: DataTypes.STRING,
        defaultValue: `article`
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: { 
        type: DataTypes.TEXT,
        allowNull: false
    },
    images: { 
        allowNull: true,
        type: DataTypes.ARRAY(Sequelize.TEXT),
        defaultValue: [],    
    },

}, { hooks: {
    beforeCreate: async (user) => {
 
    },
    beforeUpdate:async (user) => {
   
    },
    afterCreate:async (user) => {
     
    }
   },

  });

   return feature;
  }

