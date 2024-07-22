
const Sequelize = require("sequelize")
const {hasMany, belongsTo} = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const genre = sequelize.define('genre' , {
        //an order is a one to many relationship
        //one user can have many orders
    id:{ 
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          
    genre_name: {
        type: DataTypes.STRING,
       
       },
    details: {
        type: DataTypes.STRING,
        defaultValue: "genre" 
       }
    }
    )

    return genre
    }
    


