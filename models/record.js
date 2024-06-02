"use strict";
var fs = require('fs');

const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

class Record {
  constructor(id, artist, image_src, price, title, descr, genre, date_added){
    this.id = id;
    this.artist = artist;
    this.image_src = image_src;
    this.price = price;
    this.title = title;
    this.descr = descr;
    this.genre = genre;
    this.date_added = date_added
  }
    static async getAll(){
        const result = await db.query(`SELECT * FROM records
                                       ORDER BY date_added DESC`);
        if(result.rows) {
           return result.rows.map(r => new Record(r.id, r.artist, r.image_src, r.price, r.title, r.descr, r.genre, r.date_added)) 
        } else {
          return "no results found"
        }    
    }
    static async getGenre(genre){
      const result = await db.query(`SELECT r.id, r.artist, r.image_src, r.price, r.title, r.descr, g.genre_name
      FROM records R JOIN records_genres rg ON r.id = rg.record_id
      JOIN genres g ON rg.genre_id = g.id AND g.genre_name = $1`,[genre]);
      if(result.rows) {
       return result.rows.map(r => new Record(r.id, r.artist, r.image_src, r.price, r.title, r.descr, r.genre, r.date_added))
      } else {
        return "no records of this genre found"
      } 
  }
    static async getRecord(id){
      const r = await db.query(`
                                    SELECT * FROM records WHERE id = ${id}`);
      return new Record(r.id, r.artist, r.image_src, r.price, r.title, r.descr, r.genre, r.date_added)}

    static async addNew({artist, title, genre, price, description, image_src, date_added}){
      const result = await db.query(`INSERT INTO records(artist, title, genre, price, descr, image_src, date_added)
                                     VALUES($1,$2,$3,$4,$5,$6,$7) 
                                     RETURNING id, artist, title, genre, price, descr AS description, image_src`,[artist, title, genre, price, description, image_src, date_added])
      const record = result.rows[0];
      //here we need to check for genre 
      let storedGenre = await db.query(`SELECT id, genre_name FROM genres
                                  WHERE genre_name = $1`,[genre])

      if(storedGenre.rows.length < 1){
        console.log("not yet in the database.")
        //if no results we need to add the genre
        storedGenre = await db.query(`INSERT INTO genres(genre_name)
                                      VALUES($1)
                                      RETURNING id, genre_name`,[genre])}
      console.log("here are our record and genre values to add the relation", record.id, storedGenre.rows[0].id) //undefined
      await db.query(`INSERT INTO records_genres(record_id, genre_id)
                                        VALUES($1,$2)`,[record.id, storedGenre.rows[0].id])
      let storedArtist = await db.query(`SELECT id, artist_name FROM artists
                                        WHERE artist_name = $1`,[artist])
      if(storedArtist.rows.length < 1){
        console.log("artist not yet in the database.")
        //if no results we need to add the genre
        storedArtist = await db.query(`INSERT INTO artists(artist_name)
                                      VALUES($1)
                                      RETURNING id, artist_name`,[artist])                           
      } 
      console.log("adding record id ", record.id, "adding artist_id", storedArtist.rows[0].id)
     await db.query(`INSERT INTO artists_records(record_id, artist_id)
                                        VALUES($1,$2)`,[record.id, storedArtist.rows[0].id])
    } 

    static async updateRecord({artist, title, genre, price, description, image_src}, id){
      console.log("adding id in update record", id)
      let record = await db.query(`UPDATE records
      SET artist = $1,
      title = $2,
      genre = $3,
      price = $4,
      descr = $5,
      image_src = $6
      WHERE id = $7
      RETURNING *;`,[artist, title, genre, price, description, image_src, id])
      let storedGenre = await db.query(`SELECT id, genre_name FROM genres
      WHERE genre_name = $1`,[genre])

if(storedGenre.rows.length < 1){
console.log("not yet in the database.")
storedGenre = await db.query(`INSERT INTO genres(genre_name)
          VALUES($1)
          RETURNING id, genre_name`,[genre])                       
}
//if no genre was present upon edit, we created a new one. 
console.log("adding a relation what are our ids", id, storedGenre.rows[0].id)

let storedRecordGenreRelation = await db.query(`SELECT * FROM records_genres
                                                WHERE record_id = $1
                                                AND
                                                 genre_id = $2`,[id, storedGenre.rows[0].id])
if(storedRecordGenreRelation.rows.length < 1){
  await db.query(`INSERT INTO records_genres(record_id, genre_id)
          VALUES($1,$2)`,[id, storedGenre.rows[0].id])    
}
let storedArtist = await db.query(`SELECT id, artist_name FROM artists
            WHERE artist_name = $1`,[artist])
if(storedArtist.rows.length < 1){
storedArtist = await db.query(`INSERT INTO artists(artist_name)
          VALUES($1)
          RETURNING id, artist_name`,[artist])       
    }   
    let storedRecordArtistRelation = await db.query(`SELECT * FROM artists_records
    WHERE record_id = $1
    AND
     artist_id = $2`,[id, storedArtist.rows[0].id])
if(storedRecordArtistRelation.rows.length < 1){
await db.query(`INSERT INTO artists_records(record_id, artist_id)
VALUES($1,$2)`,[id, storedArtist.rows[0].id])    
}    
    }
    //Delete record in the db 
    static async deleteRecord(id){
      console.log("inside our record model method",id)

      let deletedRecord = await db.query(`DELETE FROM records
                                          WHERE ID = $1
                                          RETURNING *`,[id])
      let deleted = deletedRecord.rows[0]
      return deleted;
    }
    //testing our class instance. 
    intro(){
      console.log("this is a great record", this.title); // works as a class instance method. 
    }
}

module.exports = Record