"use strict";

const db = require("../db");

class Genre {

    static async getAll(){

        const result = await db.query(`SELECT * FROM genres`);
        console.log("inside get all static method: " + result.rows)
        return result.rows
    }

    static async getGenre(id){
      console.log("getting individsual record")
      //this has to be our JOIN on - many to many request
      const result = await db.query(`
                                    SELECT * FROM records WHERE id = ${id}`);
      console.log("inside get all static method: " + result.rows[0].title)
       
/*
      SELECT title, genre_name FROM records r 
      JOIN records_genres rg ON r.id = rg.record_id 
      JOIN genres g ON rg.genre_id = g.id; */


      return result.rows[0]


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