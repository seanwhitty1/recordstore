"use strict";
/** Database setup for jobly. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");
//here we are going to declare our db
let db;
/*
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? "postgresql:///recordstore"
      : process.env.DATABASE_URL || "postgresql:///test_recordstore";
}
getDatabaseUril() returns conditionally our db or our test db depending on the process.env value
*/

if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  db = new Client({
    connectionString: getDatabaseUri()
  });
}

db.connect();

module.exports = db;