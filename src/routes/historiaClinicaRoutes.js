/** Rutas para la gestión de historias clínicas. Este archivo define las rutas relacionadas con las operaciones CRUD (Crear, Leer, Actualizar) 
    para las historias clínicas de los pacientes.
**/

const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const {postHistoriaClinica, getHistorias, getHistoriaPorPaciente, updateResumen} = require("../controllers/historiaClinicaController");

router.post(
    "/",
    verifyToken,
    authorizeRoles("ADMIN", "RECEPCIONISTA"),
    postHistoriaClinica
);

router.get(
    "/",
    verifyToken,
    authorizeRoles("ADMIN", "MEDICO", "ENFERMERO"),
    getHistorias
);

router.get(
    "/paciente/:pacienteId",
    verifyToken,
    authorizeRoles("ADMIN", "MEDICO", "ENFERMERO", "PACIENTE"),
    getHistoriaPorPaciente
);

router.put(
    "/:id/resumen",
    verifyToken,
    authorizeRoles("ADMIN", "MEDICO"),
    updateResumen
);

module.exports = router;