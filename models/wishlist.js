module.exports = (sequelize, DataTypes) => {
    const wishlist = sequelize.define('wishlist' , {
  
    wishlist_status: {
        type: DataTypes.STRING,
        defaultValue: "active" 
       }
     }
    )
    return wishlist
    }
    