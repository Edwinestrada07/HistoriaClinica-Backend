/** Rutas para la gestión de la relación entre médicos y pacientes. Estas rutas permiten a los usuarios con los roles adecuados asignar 
    pacientes a médicos, obtener los pacientes asignados a un médico específico, y obtener los pacientes asignados al médico autenticado. 
**/

const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const {asignarPaciente, obtenerPacientesMedico, obtenerMisPacientes} = require("../controllers/medicoPacienteController");

router.get(
    "/mis-pacientes",
    verifyToken,
    authorizeRoles("MEDICO"),
    obtenerMisPacientes
);

router.post(
    "/:documento/pacientes",
    verifyToken,
    authorizeRoles("ADMIN", "RECEPCIONISTA"),
    asignarPaciente
);

router.get(
    "/:documento/pacientes",
    verifyToken,
    authorizeRoles("ADMIN", "RECEPCIONISTA"),
    obtenerPacientesMedico
);

module.exports = router;