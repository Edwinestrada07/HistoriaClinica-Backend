/** Moodelo de CitaMedica
    Este modelo representa la entidad CitaMedica en la base de datos. Incluye campos como fechaHora, motivo, estado y observaciones.
**/

const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const CitaMedica = sequelize.define(
    "CitaMedica",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        fechaHora: {
            type: DataTypes.DATE,
            allowNull: false
        },

        motivo: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        estado: {
            type: DataTypes.ENUM(
                "PENDIENTE",
                "CONFIRMADA",
                "ATENDIDA",
                "CANCELADA",
                "NO_ASISTIO"
            ),
            defaultValue: "PENDIENTE"
        },

        observaciones: {
            type: DataTypes.TEXT
        }
    },
    {
        tableName: "citas_medicas",
        timestamps: true
    }
);

module.exports = CitaMedica;