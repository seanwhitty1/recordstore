"use strict";
const Record = require("./record")
const db = require("../db");

/**SELECT a.artist_name, r.descr
FROM artists a JOIN artists_records ar ON a.id = ar.artist_id
JOIN records r ON ar.record_id = r.id
WHERE a.id = 1; */
//this returns us all artists and descriptions, 
//we need to add a WHERE clause
class Artist {
    constructor(id, artist_name){
        this.id = id;
        this.artist_name = artist_name;
    }

    static async getAll(){
        const r = await db.query(`SELECT * FROM artists`)
        return new Artist(r.id, r.artist_name)
    }

    static async getAllReleasesFromArtist(artist_name){

        const r = await db.query(`SELECT * FROM records r
        JOIN artists_records ar ON ar.record_id = r.id
        JOIN artists a
        ON a.id = ar.artist_id
        WHERE a.artist_name = $1;`,[artist_name]);
        return r.rows.map(r => new Record(r.id, r.artist, r.image_src, r.price, r.title, r.descr, r.genre, r.date_added))
    }   
}

module.exports = Artist;