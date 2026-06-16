/** Definición del modelo de Usuario utilizando Sequelize ORM. Este modelo representa la estructura de la tabla "usuarios" en la base 
    de datos. Incluye campos como documento, nombres, apellidos, correo, password, rol y estado. 
**/

const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Usuario = sequelize.define(
    "Usuario",
    {
        documento: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false
        },

        nombres: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        apellidos: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        correo: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        rol: {
            type: DataTypes.ENUM(
                "ADMIN",
                "MEDICO",
                "ENFERMERO",
                "RECEPCIONISTA",
                "PACIENTE"
            ),
            allowNull: false
        },

        estado: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        tableName: "usuarios"
    }
);

module.exports = Usuario;