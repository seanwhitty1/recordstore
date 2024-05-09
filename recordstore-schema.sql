DROP TABLE records_genres;
DROP TABLE artists_records;
DROP TABLE records;
DROP TABLE genres;
DROP TABLE artists;

CREATE TABLE records (
  id SERIAL PRIMARY KEY,
  artist TEXT NOT NULL,
  title TEXT NOT NULL,
  price INTEGER NOT NULL,
  descr TEXT NOT NULL,
  genre TEXT NOT NULL,
  date_added TIMESTAMP,
  image_src TEXT
);

CREATE TABLE genres (
  id SERIAL PRIMARY KEY,
  genre_name TEXT NOT NULL,
  details TEXT
);
 
CREATE TABLE records_genres (
  id SERIAL PRIMARY KEY,
  record_id INTEGER REFERENCES records ON DELETE CASCADE,
  genre_id INTEGER REFERENCES genres ON DELETE CASCADE
);

CREATE TABLE artists (

  id SERIAL PRIMARY KEY,
  artist_name TEXT 

);

CREATE TABLE artists_records (
  id SERIAL PRIMARY KEY,
  record_id INTEGER REFERENCES records ON DELETE CASCADE,
  artist_id INTEGER REFERENCES artists ON DELETE CASCADE
);


