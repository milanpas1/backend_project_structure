const {Pool}= require("pg");

const pool= new Pool({
    host: "localhost",
    port: 5432,
    user:"backend_user",
    password:"backend_pass",
    database:"backend_db",
})

module.exports = pool;