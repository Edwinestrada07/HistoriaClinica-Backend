/** Controlador para la gestión de la relación entre médicos y pacientes. Este controlador incluye funciones para asignar pacientes a médicos,
    obtener los pacientes asignados a un médico específico, y obtener los pacientes asignados al médico autenticado. 
**/
const { Medico, Paciente, Usuario} = require("../models");

/** Asigna un paciente a un médico 
    Esta función recibe el documento del médico a través de los parámetros de la solicitud y el ID del paciente a través del cuerpo de la 
    solicitud. Verifica que tanto el médico como el paciente existan en la base de datos, y que el paciente no esté ya asignado al médico.
**/
const asignarPaciente = async (req, res) => {
    try {

        const { documento } = req.params;
        const { pacienteId } = req.body;

        const medico = await Medico.findByPk(documento);

        if (!medico) {
            return res.status(404).json({
                message: "Médico no encontrado"
            });
        }

        const paciente = await Paciente.findByPk(pacienteId);

        if (!paciente) {
            return res.status(404).json({
                message: "Paciente no encontrado"
            });
        }

        const yaAsignado = await medico.hasPaciente(paciente);

        if (yaAsignado) {
            return res.status(400).json({
                message: "El paciente ya está asignado"
            });
        }

        await medico.addPaciente(paciente);

        return res.status(201).json({
            message: "Paciente asignado correctamente"
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};

/** Obtener los pacientes asignados a un médico por su documento (ID). 
    Esta función recupera los pacientes asignados a un médico específico de la base de datos utilizando su documento como identificador y 
    los devuelve al cliente. 
**/
const obtenerPacientesMedico = async (req, res) => {
    try {

        const { documento } = req.params;

        const medico = await Medico.findByPk(documento, {
            include: {
                model: Paciente,
                as: "pacientes",
                include: {
                model: Usuario,
                as: "usuario",
                attributes: {
                    exclude: ["password"]
                }
                }
            }
        });

        if (!medico) {
            return res.status(404).json({
                message: "Médico no encontrado"
            });
        }

        return res.json(medico.pacientes);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};

/** Obtener los pacientes asignados al médico autenticado. 
    Esta función recupera los pacientes asignados al médico autenticado de la base de datos utilizando su documento como identificador y 
    los devuelve al cliente. 
**/
const obtenerMisPacientes = async (req, res) => {
    try {

        const documento = req.usuario.documento;

        const medico = await Medico.findByPk(documento, {
            include: {
                model: Paciente,
                as: "pacientes",
                include: {
                model: Usuario,
                as: "usuario",
                attributes: {
                    exclude: ["password"]
                }
                }
            }
        });

        if (!medico) {
            return res.status(404).json({
                message: "Perfil médico no encontrado"
            });
        }

        return res.json(medico.pacientes);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    asignarPaciente,
    obtenerPacientesMedico,
    obtenerMisPacientes
};