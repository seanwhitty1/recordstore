"use strict";
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

class Record {

    static async getAll(){

        const result = await db.query(`SELECT * FROM records`);
        if(result.rows) {
          return result.rows
        } else {
          return "no results found"
        }    
    }

    static async getGenre(genre){

      const result = await db.query(`SELECT r.artist, g.genre_name
      FROM records R JOIN records_genres rg ON r.id = rg.record_id
      JOIN genres g ON rg.genre_id = g.id AND g.genre_name = $1`,[genre]);

      if(result.rows) {
        return result.rows
      } else {
        return "no records of this genre found"
      } 
  }

    static async getRecord(id){
      console.log("getting individsual record")
      const result = await db.query(`
                                    SELECT * FROM records WHERE id = ${id}`);
      console.log("inside get all static method: " + result.rows[0].title)
      return result.rows[0]
    }

    static async addNew(artist, title, genre, price, description, image_src){
      console.log("what is our iamge_src before we input")
      const result = await db.query(`INSERT INTO records(artist, title, price, descr, image_src)
                                     VALUES($1,$2,$3,$4,$5) 
                                     RETURNING id, artist, title, price, descr AS description, image_src`,[artist, title, price, description, image_src])
      const record = result.rows[0];
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
    }

    static async deleteRecord(id){
      console.log("inside our record model method",id)

      let deletedRecord = await db.query(`DELETE FROM records
                                          WHERE ID = $1
                                          RETURNING *`,[id])
      let deleted = deletedRecord.rows[0]
      return deleted;

    }
}

module.exports = Record