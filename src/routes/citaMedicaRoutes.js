const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const {
    postCitaMedica,
    getCitasMedicas,
    getCitaMedicaPorId,
    updateCitaMedica,
    deleteCitaMedic,
    getPorMedico,
    getPorPaciente,
    proximasCitas
} = require("../controllers/citaMedicaController");

router.post(
    "/",
    verifyToken,
    authorizeRoles("ADMIN", "RECEPCIONISTA", "PACIENTE", "ENFERMERO"),
    postCitaMedica
);

router.get(
    "/",
    verifyToken,
    authorizeRoles("ADMIN", "MEDICO", "ENFERMERO", "RECEPCIONISTA", "PACIENTE"),
    getCitasMedicas
);

router.get(
    "/proximas",
    verifyToken,
    authorizeRoles("ADMIN", "MEDICO", "ENFERMERO", "RECEPCIONISTA", "PACIENTE"),
    proximasCitas
);

router.get(
    "/medico/:medicoId",
    verifyToken,
    authorizeRoles("ADMIN", "MEDICO", "ENFERMERO", "RECEPCIONISTA"),
    getPorMedico
);

router.get(
    "/paciente/:pacienteId",
    verifyToken,
    authorizeRoles("ADMIN", "MEDICO", "ENFERMERO", "PACIENTE", "RECEPCIONISTA"),
    getPorPaciente
);

router.get(
    "/:id",
    verifyToken,
    authorizeRoles("ADMIN", "MEDICO", "ENFERMERO", "RECEPCIONISTA", "PACIENTE"),
    getCitaMedicaPorId
);

router.put(
    "/:id",
    verifyToken,
    authorizeRoles("ADMIN", "MEDICO"),
    updateCitaMedica
);

router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("ADMIN", "MEDICO"),
    deleteCitaMedic
);

module.exports = router;