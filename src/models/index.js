/** Configuración de los modelos y sus relaciones utilizando Sequelize ORM. En este archivo se importan los modelos de Usuario, 
    Paciente y Médico, y se establecen las relaciones entre ellos. La relación entre Usuario y Paciente es de uno a uno, al igual que 
    la relación entre Usuario y Médico. Esto significa que cada usuario puede ser un paciente o un médico, pero no ambos al mismo tiempo. 
**/

const Usuario = require("./Usuario");
const Paciente = require("./Paciente");
const Medico = require("./Medico");


// Usuario - Paciente

Usuario.hasOne(Paciente, {
  foreignKey: "documento"
});

Paciente.belongsTo(Usuario, {
  foreignKey: "documento"
});


// Usuario - Médico

Usuario.hasOne(Medico, {
  foreignKey: "documento"
});

Medico.belongsTo(Usuario, {
  foreignKey: "documento"
});


module.exports = {
  Usuario,
  Paciente,
  Medico
};