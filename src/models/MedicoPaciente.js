/** Modelo de asociación entre Médico y Paciente utilizando Sequelize ORM. Este modelo representa la relación de muchos a muchos entre médicos y pacientes, 
    donde un médico puede tener múltiples pacientes y un paciente puede ser atendido por múltiples médicos. La tabla "medico_paciente" 
    incluye un campo "fechaAsignacion" para registrar la fecha en que se asignó el médico al paciente.
**/

const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const MedicoPaciente = sequelize.define(
    "MedicoPaciente",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        fechaAsignacion: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },

        estado: {
            type: DataTypes.ENUM(
                "ACTIVO",
                "INACTIVO",
                "TRASLADADO"
            ),
            allowNull: false,
            defaultValue: "ACTIVO"
        },

        observaciones: {
            type: DataTypes.TEXT,
            defaultValue: ""
        }
    },
    {
        tableName: "medico_paciente",
        timestamps: true
    }
);

module.exports = MedicoPaciente;