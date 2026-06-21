/** Modelo de Historia Clínica utilizando Sequelize ORM. Este modelo representa la historia clínica de un paciente en la base de datos. 
    Incluye campos como id, pacienteId, fechaCreacion y resumen. La historia clínica está asociada a un paciente específico a través del 
    campo pacienteId, que es único para cada paciente. El campo fechaCreacion registra la fecha en que se creó la historia clínica, y el 
    campo resumen puede contener información adicional sobre el estado de salud del paciente.
**/

const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const HistoriaClinica = sequelize.define(
    "HistoriaClinica",
    {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },

        pacienteId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
        },

        fechaCreacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
        },

        resumen: {
        type: DataTypes.TEXT
        }
    },
    {
        tableName: "historias_clinicas",
        timestamps: true,
        updatedAt: false
    }
);

module.exports = HistoriaClinica;