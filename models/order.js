
const Sequelize = require("sequelize")
const {hasMany, belongsTo} = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const order = sequelize.define('order' , {
        //an order is a one to many relationship
        //one user can have many orders
    order_status: {
        type: DataTypes.STRING,
        defaultValue: "active" 
       },
    order_type: {
        type: DataTypes.STRING
    }
    }
    )

    return order
    }
    