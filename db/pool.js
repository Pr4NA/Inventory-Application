const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost", 
  user: "postgres",
  database: "pokemon",
  password: "1234",
  port: 5432 
});