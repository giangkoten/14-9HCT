const mysql = require("mysql2");

let pool = mysql.createPool({
  database: "crud14-9",
  host: "localhost",
  user: "root",
  password: "giang20071999",
  port: 3306,
});
module.exports = pool.promise();
