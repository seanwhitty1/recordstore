"use strict";

const db = require("../db");

/**SELECT a.artist_name, r.descr
FROM artists a JOIN artists_records ar ON a.id = ar.artist_id
JOIN records r ON ar.record_id = r.id
WHERE a.id = 1; */
//this returns us all artists and descriptions, 
//we need to add a WHERE clause

class Artist {

    static async getAll(){
        const result = await db.query(`SELECT * FROM artists`)
        return result.rows
    }

    static async getAllReleasesFromArtist(artist_name){

        const result = await db.query(`SELECT * FROM records r
        JOIN artists_records ar ON ar.record_id = r.id
        JOIN artists a
        ON a.id = ar.artist_id
        WHERE a.artist_name = $1;`,[artist_name]);
        return result.rows
    }

    
}

module.exports = Artist;