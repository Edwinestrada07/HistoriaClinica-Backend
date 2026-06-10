/** Definición del modelo de Paciente utilizando Sequelize ORM. Este modelo representa la estructura de la tabla "pacientes" en la base 
    de datos. Incluye campos como documento, fecha de nacimiento, dirección y teléfono. El campo "documento" es la clave primaria que se 
    relaciona con el modelo de Usuario, estableciendo una relación uno a uno entre ambos modelos. 
**/

const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Paciente = sequelize.define(
  "Paciente",
  {
    documento: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },

    fechaNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false  
    },

    direccion: {
      type: DataTypes.STRING
    },

    telefono: {
      type: DataTypes.STRING(20)
    }
  },
  {
    tableName: "pacientes"
  }
);

module.exports = Paciente;