"use strict";

const db = require("../db");
/*
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
*/

const { BCRYPT_WORK_FACTOR } = require("../config.js");

class Record {

    static async getAll(){

        const result = await db.query(`SELECT * FROM records`);
        console.log("inside get all static method: " + result.rows)
        return result.rows
    }

    static async getRecord(id){
      console.log("getting individsual record")
      const result = await db.query(`
                                    SELECT * FROM records WHERE id = ${id}`);
      console.log("inside get all static method: " + result.rows[0].title)
       

      return result.rows[0]


    }

    static async addNew(artist, title, genre, price, description, image_src){
      const result = await db.query(`INSERT INTO records(artist, title, price, descr, image_src)
                                     VALUES($1,$2,$3,$4,$5) 
                                     RETURNING id, artist, title, price, descr AS description, image_src AS imageSrc`,[artist, title, price, description, image_src])
      const record = result.rows[0];
      console.log("record",record)
      console.log(record)
      //here we need to check for genre 
      let storedGenre = await db.query(`SELECT id, genre_name FROM genres
                                  WHERE genre_name = $1`,[genre])
      if(storedGenre.rows.length < 1){
        console.log("not yet in the database.")
        //if no results we need to add the genre
        storedGenre = await db.query(`INSERT INTO genres(genre_name)
                                      VALUES($1)
                                      RETURNING id, genre_name`,[genre])
                                  
      }
      console.log("here are our values to add the relation", record.id, storedGenre.rows[0].id) //undefined
      let newRelation = await db.query(`INSERT INTO records_genres(record_id, genre_id)
                                        VALUES($1,$2)`,[record.id, storedGenre.rows[0].id])
      
      //then we need to add a relation to record and genre (which conditinoally was created. )

      

    }
}

module.exports = Record