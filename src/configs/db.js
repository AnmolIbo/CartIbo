const knex =require("knex");
// const knexfile =require("./knexfile");
// const db =knex(knexfile.development);
const db = require("knex")({
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "123456",
      database: "postgres"
    }
  });
  

module.exports =db;