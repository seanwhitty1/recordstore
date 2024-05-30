"use strict";
var fs = require('fs');
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

class User {
    static async get(username){
        const result = await db.query(`SELECT * FROM users
                                       WHERE username = $1`,[username]);
        if(result.rows) {
          return result.rows
        } else {
          return "no users found"
        }    
    }

    static async addNew({username, fullname, shipping_address, passkey, email, salt}){
        console.log(username, fullname, shipping_address, passkey)
 
      //here we need to check for genre 
      let usernameDuplicateCheck = await db.query(`SELECT * FROM users
                                  WHERE username = $1`,[username])

      if(usernameDuplicateCheck .rows.length < 1){
        console.log("not yet in the database.")
        //if no results we need to add the user   
        const result = await db.query(`INSERT INTO users(username, fullname, shipping_address, passkey, email, salt)
        VALUES($1,$2,$3,$4,$5,$6) 
        RETURNING id, username, fullname, shipping_address, passkey`,[username, fullname, shipping_address, passkey, email, salt])              
      } else {
        //userName already exists
        console.log("username is already taken")
        
      }
    }
    static async updateUser({username, fullname, shipping_address, passwordkey}, id){
    //let usernameDuplicateCheck = await db.query(`SELECT * FROM users
                               //   WHERE username = $1`,[username])
      console.log("adding id in update user", id)
      let record = await db.query(`UPDATE users
      SET username = $1,
      shipping_address = $2,
      passwordkey = $3,
      WHERE id = $4
      RETURNING *;`,[username, fullname, shipping_address, passwordkey])
}
    static async deleteUser(id){
      let deletedUser = await db.query(`DELETE FROM users
                                          WHERE ID = $1
                                          RETURNING *`,[id])
      return deletedUser.rows[0]
    }
}
module.exports = User;