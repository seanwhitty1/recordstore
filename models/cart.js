//carts belong to one user, 
//one user can have one cart 
// 1:1 relationship.
//carts have many items, items have many carts n:n relationship
module.exports = (sequelize, DataTypes) => {
    const cart = sequelize.define('cart' , {
    cart_status: {
        type: DataTypes.STRING,
        defaultValue: "active" 
       }
    }
    )

    return cart
    }
    