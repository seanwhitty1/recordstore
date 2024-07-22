
const Sequelize = require("sequelize")
const {hasMany, belongsTo} = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const label = sequelize.define('label' , {
    id:{ 
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          
    label_name: {
        type: DataTypes.STRING,
        defaultValue: "active" 
       }
    }
    )
    return label
    }
    