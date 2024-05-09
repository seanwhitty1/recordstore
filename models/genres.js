"use strict";

const db = require("../db");

class Genre {

    static async getAll(){

        const result = await db.query(`SELECT * FROM genres`);
        console.log("inside get all static method: " + result.rows)
        return result.rows
    }

    static async getGenre(genre_name){
     
      //this has to be our JOIN on - many to many request
      const result = await db.query(`SELECT * FROM records r
      JOIN records_genres rg ON rg.record_id = r.id
      JOIN genres g
      ON g.id = rg.genre_id
      WHERE g.genre_name = $1`,[genre_name]);
      
      return result.rows


    }

    static async addNew(genre_name, details){
      const result = await db.query(`INSERT INTO genres(genre_name, details)
                                     VALUES($1,$2) 
                                     RETURNING genre_name, details`,[genre_name,details])
      const record = result.rows[0];
      return record

    }
}

module.exports = Genre;