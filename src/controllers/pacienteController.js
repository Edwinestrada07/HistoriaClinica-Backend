/** Controlador para manejar las operaciones relacionadas con los pacientes. Este archivo contiene las funciones para crear un nuevo paciente, 
    obtener la lista de pacientes, obtener un paciente por su documento, actualizar la información de un paciente y eliminar un paciente. 
    Estas funciones interactúan con el modelo de Paciente para realizar las operaciones correspondientes en la base de datos y devuelven las 
    respuestas adecuadas al cliente.
**/

const { Paciente, Usuario } = require("../models");

/** Crea un nuevo paciente. 
    Esta función recibe los datos del paciente a través de la solicitud, verifica que el usuario asociado exista y tenga el rol de "PACIENTE",
    y luego crea un nuevo registro de paciente en la base de datos utilizando el modelo de Paciente. Si el usuario no existe, no tiene el rol 
    adecuado, o el paciente ya existe, se devuelve un mensaje de error con el estado correspondiente. Si la creación es exitosa, se devuelve 
    la información del paciente registrado.
**/
const postPaciente = async (req, res) => {
    try {
        const { documento } = req.body;

        const usuario = await Usuario.findByPk(documento);

        if (!usuario) {
            return res.status(404).json({
                message: "El usuario no existe"
            });
        }

        if (usuario.rol !== "PACIENTE") {
            return res.status(400).json({
                message: "El usuario no tiene rol PACIENTE"
            });
        }

        const existePaciente = await Paciente.findByPk(documento);

        if (existePaciente) {
            return res.status(400).json({
                message: "El paciente ya existe"
            });
        }

        const paciente = await Paciente.create(req.body);

        return res.json({
            message: "Paciente registrado correctamente",
            paciente
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error interno del servidor"
        });

    }
};

/** Obtener la lista de pacientes. 
    Esta función recupera todos los registros de pacientes de la base de datos y los devuelve al cliente. Cada paciente incluye la información 
    del usuario asociado, pero se excluye la contraseña por razones de seguridad.
**/
const getPacientes = async (req, res) => {
    try {

        const pacientes = await Paciente.findAll({
            include: {
                model: Usuario,
                as: "usuario",
                attributes: {
                    exclude: ["password"]
                }
            }
        });

        return res.json(pacientes);

    } catch (error) {

        return res.status(500).json({
            message: "Error interno del servidor"
        });

    }
};

/** Obtener un paciente por su documento (ID). 
    Esta función recupera un paciente específico de la base de datos utilizando su documento como identificador y lo devuelve al cliente. 
    Si el paciente no existe, se devuelve un mensaje de error con el estado correspondiente. Si se encuentra, se devuelve la información del 
    paciente.
**/
const getPaciente = async (req, res) => {
    try {

        const paciente = await Paciente.findByPk(
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

        if (!paciente) {
            return res.status(404).json({
                message: "Paciente no encontrado"
            });
        }

        return res.json(paciente);

    } catch (error) {

        return res.status(500).json({
            message: "Error interno del servidor"
        });

    }
};

/** Actualizar la información de un paciente. 
    Esta función recibe los datos actualizados del paciente a través de la solicitud, busca el paciente correspondiente en la base de datos utilizando su documento,
    y actualiza la información del paciente con los nuevos datos proporcionados. Si el paciente no existe, se devuelve un mensaje de error con el estado 
    correspondiente. Si la actualización es exitosa, se devuelve la información actualizada del paciente.
**/
const updatePaciente = async (req, res) => {
    try {

        const paciente = await Paciente.findByPk(
            req.params.documento
        );

        if (!paciente) {
            return res.status(404).json({
                message: "Paciente no encontrado"
            });
        }

        await paciente.update(req.body);

        return res.json({
            message: "Paciente actualizado correctamente",
            paciente
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error interno del servidor"
        });

    }
};

/** Eliminar un paciente. 
    Esta función recibe el documento del paciente a través de los parámetros de la solicitud, busca el paciente correspondiente en la base de datos, y lo elimina. 
    Si el paciente no existe, se devuelve un mensaje de error con el estado correspondiente. Si la eliminación es exitosa, se devuelve un mensaje de confirmación.
**/
const deletePaciente = async (req, res) => {
    try {

        const paciente = await Paciente.findByPk(
            req.params.documento
        );

        if (!paciente) {
            return res.status(404).json({
                message: "Paciente no encontrado"
            });
        }

        await paciente.destroy();

        return res.json({
            message: "Paciente eliminado correctamente"
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error interno del servidor"
        });

    }
};

module.exports = {
    postPaciente,
    getPacientes,
    getPaciente,
    updatePaciente,
    deletePaciente
};