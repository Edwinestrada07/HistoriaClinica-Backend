/** Controlador de Cita Médica. Este controlador maneja las operaciones relacionadas con las citas médicas, incluyendo la creación de nuevas 
 *  citas y la validación de asignaciones entre médicos y pacientes.
**/

const {CitaMedica, Paciente, Medico, MedicoPaciente} = require("../models");
const { Op } = require("sequelize");

/** Crea una nueva cita médica. 
    Esta función recibe los datos de la cita médica a través del cuerpo de la solicitud, incluyendo el ID del paciente, el ID del médico
    verifica que el paciente esté asignado al médico correspondiente. Si la asignación es válida, se crea la cita médica en la base de datos 
    y se devuelve la información de la cita creada al cliente. En caso de error, se devuelve un mensaje de error con el estado correspondiente.
**/
const postCitaMedica = async (req, res) => {
    try {

        const {pacienteId, medicoId, fechaHora, motivo, observaciones} = req.body;

        const asignacion = await MedicoPaciente.findOne({
            where: {
                medicoId,
                pacienteId
            }
        });

        if (!asignacion) {
            return res.status(400).json({
                message:
                "El paciente no está asignado al médico."
            });
        }

        const cita = await CitaMedica.create({
            pacienteId,
            medicoId,
            fechaHora,
            motivo,
            observaciones
        });

        res.status(201).json(cita);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

/** Obtiene todas las citas médicas. 
    Esta función recupera todas las citas médicas de la base de datos y las devuelve al cliente. 
**/
const getCitasMedicas = async (req, res) => {

    try {

        const citas = await CitaMedica.findAll({
            include: [
                { model: Paciente, as: "paciente" },
                { model: Medico, as: "medico" }
            ]
        });

        res.json(citas);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

/** Obtiene las próximas citas médicas.
    Esta función recupera todas las citas médicas cuya fecha y hora sean mayores o iguales a la fecha y hora actual, y las devuelve al 
    cliente.
 */
const proximasCitas = async (req, res) => {

    try {

        const citas = await CitaMedica.findAll({
            where: {
                fechaHora: {
                    [Op.gte]: new Date()
                }
            }
        });

        res.json(citas);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

/** Obtiene las citas médicas por ID de médico.
    Esta función recupera todas las citas médicas asociadas a un médico específico por su ID de la base de datos y las devuelve al cliente.
 */
const getPorMedico = async (req, res) => {

    try {

        const citas = await CitaMedica.findAll({
            where: {
                medicoId: req.params.medicoId
            },
            include: [{ model: Paciente, as: "paciente" }]
        });

        res.json(citas);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

/** Obtiene las citas médicas por ID de paciente.
    Esta función recupera todas las citas médicas asociadas a un paciente específico por su ID de la base de datos y las devuelve al cliente.
 */
const getPorPaciente = async (req, res) => {

    try {

        const citas = await CitaMedica.findAll({
            where: {
                pacienteId: req.params.pacienteId
            },
            include: [{ model: Medico, as: "medico" }]
        });

        res.json(citas);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

/** Obtiene una cita médica por su ID. 
    Esta función recupera una cita médica específica por su ID de la base de datos y la devuelve al cliente.
**/
const getCitaMedicaPorId = async (req, res) => {

    try {

        const cita = await CitaMedica.findByPk(
            req.params.id,
            {
                include: [
                    { model: Paciente, as: "paciente" },
                    { model: Medico, as: "medico" }
                ]
            }
        );

        if (!cita) {
            return res.status(404).json({
                message: "Cita no encontrada"
            });
        }

        res.json(cita);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

/** Actualiza una cita médica existente.
    Esta función recibe el ID de la cita médica a través de los parámetros de la solicitud y los datos actualizados a través del cuerpo de 
    la solicitud. Verifica que la cita médica exista y, si es así, actualiza la información.
 */
const updateCitaMedica = async (req, res) => {

    try {

        const cita = await CitaMedica.findByPk(
            req.params.id
        );

        if (!cita) {
            return res.status(404).json({
                message: "Cita no encontrada"
            });
        }

        await cita.update(req.body);

        res.json({
            message: "Cita actualizada",
            cita
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

/** Elimina una cita médica existente.
    Esta función recibe el ID de la cita médica a través de los parámetros de la solicitud. Verifica que la cita médica exista y, si es así, 
    la elimina de la base de datos y devuelve un mensaje de confirmación. En caso de error, se devuelve un mensaje de error con el estado 
    correspondiente.
 */
const deleteCitaMedic = async (req, res) => {

    try {

        const cita = await CitaMedica.findByPk(
            req.params.id
        );

        if (!cita) {
            return res.status(404).json({
                message: "Cita no encontrada"
            });
        }

        await cita.destroy();

        res.json({
            message: "Cita eliminada"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    postCitaMedica,
    getCitasMedicas,
    proximasCitas,
    getPorMedico,
    getPorPaciente,
    getCitaMedicaPorId,
    updateCitaMedica,
    deleteCitaMedic
};