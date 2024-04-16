DROP TABLE records_genres;
DROP TABLE records;
DROP TABLE genres;


CREATE TABLE records (
  id SERIAL PRIMARY KEY,
  artist TEXT NOT NULL,
  title TEXT NOT NULL,
  price INTEGER NOT NULL,
  descr TEXT,
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


