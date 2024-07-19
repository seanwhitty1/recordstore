
module.exports = (sequelize, DataTypes) => {
    const tag = sequelize.define('tag' , {
    
    tag_name: {
        type: DataTypes.STRING,
        allowNull: false
     
       },
    description: {
        type: DataTypes.STRING,
        allowNull: true
     
       }
    }
    )

    return tag
    }
    