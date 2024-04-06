DROP TABLE records;
DROP TABLE genres;
DROP TABLE records_genres;

CREATE TABLE records (
  id SERIAL PRIMARY KEY,
  artist TEXT NOT NULL,
  title TEXT NOT NULL,
  price INTEGER NOT NULL,
  descr TEXT,
  image_src TEXT
);

CREATE TABLE genres (
  id SERIAL PRIMARY KEY
  genre_name TEXT NOT,
  details TEXT
);
 
CREATE TABLE records_genres (
  id SERIAL PRIMARY KEY,
  record_id INTEGER REFERENCES records,
  genre_id TEXT REFERENCES genres
);


