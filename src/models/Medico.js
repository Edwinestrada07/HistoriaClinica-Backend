/** Definición del modelo de Medico utilizando Sequelize ORM. Este modelo representa la estructura de la tabla "medicos" en la base de 
    datos. Incluye campos como documento, fecha de nacimiento, dirección, teléfono, especialidad y registro profesional. 
    El campo "documento" es la clave primaria que se relaciona con el modelo de Usuario, estableciendo una relación uno a uno entre 
    ambos modelos. Además, el campo "registroProfesional" es único para cada médico, asegurando que no haya duplicados en la base de datos. 
**/

const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Medico = sequelize.define(
  "Medico",
  {
    documento: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },

    fechaNacimiento: {
      type: DataTypes.DATEONLY
    },

    direccion: {
      type: DataTypes.STRING
    },

    telefono: {
      type: DataTypes.STRING(20)
    },

    especialidad: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    registroProfesional: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  },
  {
    tableName: "medicos"
  }
);

module.exports = Medico;