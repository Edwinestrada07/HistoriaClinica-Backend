/** Configuración de los modelos y sus relaciones utilizando Sequelize ORM. En este archivo se importan los modelos de Usuario, 
    Paciente y Médico, y se establecen las relaciones entre ellos. La relación entre Usuario y Paciente es de uno a uno, al igual que 
    la relación entre Usuario y Médico. Esto significa que cada usuario puede ser un paciente o un médico, pero no ambos al mismo tiempo. 
**/

const Usuario = require("./Usuario");
const Paciente = require("./Paciente");
const Medico = require("./Medico");
const MedicoPaciente = require("./MedicoPaciente");
const HistoriaClinica = require("./HistoriaClinica");
const CitaMedica = require("./CitaMedica");

// Usuario - Paciente

Usuario.hasOne(Paciente, {
    foreignKey: "documento",
    as: "paciente"
});

Paciente.belongsTo(Usuario, {
    foreignKey: "documento",
    as: "usuario"
});

// Usuario - Médico

Usuario.hasOne(Medico, {
    foreignKey: "documento",
    as: "medico"
});

Medico.belongsTo(Usuario, {
    foreignKey: "documento",
    as: "usuario"
});

// Médico - Paciente

Medico.belongsToMany(Paciente, {
    through: MedicoPaciente,
    foreignKey: "medicoId",
    otherKey: "pacienteId",
    as: "pacientes"
});

Paciente.belongsToMany(Medico, {
    through: MedicoPaciente,
    foreignKey: "pacienteId",
    otherKey: "medicoId",
    as: "medicos"
});

// Paciente - Historia Clínica

Paciente.hasOne(HistoriaClinica, {
    foreignKey: "pacienteId",
    as: "historiaClinica"
});

HistoriaClinica.belongsTo(Paciente, {
    foreignKey: "pacienteId",
    as: "paciente"
});

// Paciente - Cita Médica

Paciente.hasMany(CitaMedica, {
    foreignKey: "pacienteId",
    as: "citas"
});

CitaMedica.belongsTo(Paciente, {
    foreignKey: "pacienteId",
    as: "paciente"
});

// Médico - Cita Médica

Medico.hasMany(CitaMedica, {
    foreignKey: "medicoId",
    as: "citas"
});

CitaMedica.belongsTo(Medico, {
    foreignKey: "medicoId",
    as: "medico"
});

module.exports = {
    Usuario,
    Paciente,
    Medico,
    MedicoPaciente,
    HistoriaClinica,
    CitaMedica
};