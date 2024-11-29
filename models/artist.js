
const Sequelize = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const artist = sequelize.define('artist' , {
        //an order is a one to many relationship
        //one user can have many orders
    id:{ 
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          
    artist_name: {
        type: DataTypes.STRING,
        defaultValue: "active" 
       }
    }
    )

    return artist
    }
    