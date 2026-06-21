/** Controlador para gestionar las operaciones relacionadas con la historia clínica. Este archivo contiene las funciones para crear una 
    nueva historia clínica, obtener la lista de historias clínicas, obtener una historia clínica por el ID del paciente y actualizar el 
    resumen de una historia clínica. Estas funciones interactúan con el modelo de HistoriaClinica para realizar las operaciones 
    correspondientes en la base de datos y devuelven las respuestas adecuadas al cliente.
**/

const {HistoriaClinica, Paciente, Usuario} = require("../models");

/** Crea una nueva historia clínica
    Esta función recibe el ID del paciente y un resumen a través del cuerpo de la solicitud, verifica que el paciente exista en la base de 
    datos, y luego crea un nuevo registro de historia clínica asociado a ese paciente utilizando el modelo de HistoriaClinica. Si el paciente 
    no existe o ya tiene una historia clínica, se devuelve un mensaje de error con el estado correspondiente. Si la creación es exitosa, se 
    devuelve la información de la historia clínica creada.
**/
const postHistoriaClinica = async (req, res) => {
    try {

        const { pacienteId, resumen } = req.body;

        const paciente = await Paciente.findByPk(pacienteId);

        if (!paciente) {
            return res.status(404).json({
                message: "Paciente no encontrado"
            });
        }

        const existeHistoria = await HistoriaClinica.findOne({
            where: { pacienteId }
        });

        if (existeHistoria) {
            return res.status(400).json({
                message: "El paciente ya tiene una historia clínica"
            });
        }

        const historia = await HistoriaClinica.create({
            pacienteId,
            resumen
        });

        return res.status(201).json(historia);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};

/** Obtiene la lista de historias clínicas
    Esta función recupera todas las historias clínicas de la base de datos, incluyendo información del paciente y del usuario asociado. 
    Si la operación es exitosa, se devuelve la lista de historias clínicas.
**/
const getHistorias = async (req, res) => {
    try {

        const historias = await HistoriaClinica.findAll({
            include: {
                model: Paciente,
                as: "paciente",
                include: {
                    model: Usuario,
                    as: "usuario",
                    attributes: {
                        exclude: ["password"]
                    }
                }
            }
        });

        return res.json(historias);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};

/** Obtiene una historia clínica por el ID del paciente
    Esta función recupera la historia clínica asociada a un paciente específico utilizando el ID del paciente. Si la historia clínica existe, 
    se devuelve; de lo contrario, se devuelve un mensaje de error.
**/
const getHistoriaPorPaciente = async (req, res) => {
    try {

        const historia = await HistoriaClinica.findOne({
            where: {
                pacienteId: req.params.pacienteId
            },
            include: {
                model: Paciente,
                as: "paciente",
                include: {
                    model: Usuario,
                    as: "usuario",
                    attributes: {
                        exclude: ["password"]
                    }
                }
            }
        });

        if (!historia) {
            return res.status(404).json({
                message: "Historia clínica no encontrada"
            });
        }

        return res.json(historia);

    } catch (error) {

        return res.status(500).json({
        message: error.message
        });

    }
};

/** Actualiza el resumen de una historia clínica
    Esta función permite actualizar el resumen de una historia clínica existente utilizando su ID. Si la historia clínica no existe, se 
    devuelve un mensaje de error.
**/
const updateResumen = async (req, res) => {
    try {

        const historia = await HistoriaClinica.findByPk(
            req.params.id
        );

        if (!historia) {
            return res.status(404).json({
                message: "Historia clínica no encontrada"
            });
        }

        await historia.update({
            resumen: req.body.resumen
        });

        return res.json(historia);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    postHistoriaClinica,
    getHistorias,
    getHistoriaPorPaciente,
    updateResumen
};