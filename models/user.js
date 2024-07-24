
const Sequelize = require("sequelize")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET_KEY = require("../helpers/keys")

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id:{ 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    shipping_address: {
      type: DataTypes.STRING,
      
    },
    age: {
        type: DataTypes.INTEGER
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}
, { hooks: {
    beforeCreate: async (user) => {
     if (user.password) {
      const salt = await bcrypt.genSaltSync(10, 'a');
      user.password = bcrypt.hashSync(user.password, salt);
     }
    },
    beforeUpdate:async (user) => {
     if (user.password) {
      const salt = await bcrypt.genSaltSync(10, 'a');
      user.password = bcrypt.hashSync(user.password, salt);
     }
    },
    afterCreate:async (user) => {
        //when user.create() is called this will subsequently call the following two methods on this instance
        user.createCart() //this creates a cart on the user instance with a foreign key corresponding to that user
        user.createWishlist()
    }
   },

  });

  user.test = function(){
    console.log('from class')
  }
  user.test = function(){
    console.log('from instance')
    console.log(' I have access to this: ', this); 
  }
  user.prototype.validatePassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
  }
  user.prototype.test = function(password, hash){
    console.log("this is a test method on class instance")
  }

  user.prototype.writeJWT = async ({username, isAdmin}) => {

    isAdmin = true? isAdmin = "true": is = "false"
    console.log("within write JWT what is our username, isadmin", username, isAdmin)
    var payload = {username, isAdmin}
    const token = await jwt.sign({payload: payload}, 'secret')
     return token
  
   }
   user.decodeJWT = async (token) => {
    console.log("running the instance method of decodeJWT")
    let userObject = await jwt.decode(token)
    console.log("what is our user Object decoded from the JWT", userObject)
    return userObject


  
   }
   return user;
  };

