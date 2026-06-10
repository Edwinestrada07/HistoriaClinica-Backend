/** Configurar la conexión a la base de datos usando Sequelize ORM. Sequelize es una biblioteca de Node.js que facilita la interacción 
    con bases de datos SQL, como PostgreSQL, MySQL, SQLite, entre otras. En este archivo, se establece la conexión a la base de datos 
    utilizando las credenciales y configuraciones definidas en el archivo .env. 
**/

const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false
  }
);

module.exports = sequelize;