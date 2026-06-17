/** Controlador para manejar las operaciones relacionadas con los médicos. Este archivo contiene las funciones para crear un nuevo médico, 
    obtener la lista de médicos, obtener un médico por su documento, actualizar la información de un médico y eliminar un médico. 
    Estas funciones interactúan con el modelo de Médico para realizar las operaciones correspondientes en la base de datos.
**/

const { Medico, Usuario } = require("../models");

/** Crea un nuevo médico 
    Esta función recibe los datos del médico a través de la solicitud, verifica que el usuario asociado exista y tenga el rol de "MEDICO",
    y luego crea un nuevo registro de médico en la base de datos utilizando el modelo de Médico. Si el usuario no existe, no tiene el rol 
    adecuado, o el médico ya existe, se devuelve un mensaje de error con el estado correspondiente. Si la creación es exitosa, se devuelve
**/
const postMedico = async (req, res) => {
    try {
        const { documento, registroProfesional } = req.body;

        const usuario = await Usuario.findByPk(documento);

        if (!usuario) {
            return res.status(404).json({
                message: "El usuario no existe"
            });
        }

        if (usuario.rol !== "MEDICO") {
            return res.status(400).json({
                message: "El usuario no tiene rol MEDICO"
            });
        }

        const medicoExistente = await Medico.findByPk(documento);

        if (medicoExistente) {
            return res.status(400).json({
                message: "El médico ya existe"
            });
        }

        const registroExistente = await Medico.findOne({
            where: { registroProfesional }
        });

        if (registroExistente) {
            return res.status(400).json({
                message: "El registro profesional ya existe"
            });
        }

        const medico = await Medico.create(req.body);

        return res.json({
            message: "Médico registrado correctamente",
            medico
        });

    } catch (error) {

        return res.status(500).json({
        message: error.message
        });

    }
};

/** Obtiene la lista de médicos 
    Esta función recupera todos los registros de médicos de la base de datos y los devuelve al cliente. Cada médico incluye la información 
    del usuario asociado, pero se excluye la contraseña por razones de seguridad.
**/
const getMedicos = async (req, res) => {
    try {

        const medicos = await Medico.findAll({
            include: {
                model: Usuario,
                as: "usuario",
                attributes: {
                exclude: ["password"]
                }
            }
        });

        return res.json(medicos);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};

/** Obtiene un médico por su documento (ID).
    Esta función recupera un médico específico de la base de datos utilizando su documento como identificador. Incluye la información del 
    usuario asociado, pero excluye la contraseña.
**/
const getMedico = async (req, res) => {
    try {

        const medico = await Medico.findByPk(
            req.params.documento,
            {
                include: {
                model: Usuario,
                as: "usuario",
                attributes: {
                    exclude: ["password"]
                }
                }
            }
        );

        if (!medico) {
            return res.status(404).json({
                message: "Médico no encontrado"
            });
        }

        return res.json(medico);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};

/** Actualiza un médico por su documento (ID).
    Esta función actualiza la información de un médico específico en la base de datos utilizando su documento como identificador.
**/
const updateMedico = async (req, res) => {
    try {

        const medico = await Medico.findByPk(
            req.params.documento
        );

        if (!medico) {
            return res.status(404).json({
                message: "Médico no encontrado"
            });
        }

        await medico.update(req.body);

        return res.json({
            message: "Médico actualizado correctamente",
            medico
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};

/** Elimina un médico por su documento (ID).
    Esta función elimina un médico específico de la base de datos utilizando su documento como identificador.
**/
const deleteMedico = async (req, res) => {
    try {

        const medico = await Medico.findByPk(
            req.params.documento
        );

        if (!medico) {
            return res.status(404).json({
                message: "Médico no encontrado"
            });
        }

        await medico.destroy();

        return res.json({
            message: "Médico eliminado correctamente"
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    postMedico,
    getMedicos,
    getMedico,
    updateMedico,
    deleteMedico
};