/** Rutas para la gestión de pacientes. Estas rutas permiten a los usuarios con los roles adecuados crear, obtener, actualizar y eliminar 
    pacientes en el sistema. Cada ruta está protegida por un middleware de autenticación que verifica el token JWT en las solicitudes, y un 
    middleware de autorización que permite el acceso solo a usuarios con los roles "ADMIN", "RECEPCIONISTA" o "ENFERMERO" según la operación. 
    Las rutas definidas en este archivo son:
**/

const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const {postPaciente, getPacientes, getPaciente, updatePaciente, deletePaciente} = require("../controllers/pacienteController");

router.post(
    "/",
    verifyToken,
    authorizeRoles("ADMIN", "RECEPCIONISTA"),
    postPaciente
);

router.get(
    "/",
    verifyToken,
    authorizeRoles("ADMIN", "RECEPCIONISTA", "ENFERMERO"),
    getPacientes
);

router.get(
    "/:documento",
    verifyToken,
    authorizeRoles("ADMIN", "RECEPCIONISTA", "ENFERMERO"),
    getPaciente
);

router.put(
    "/:documento",
    verifyToken,
    authorizeRoles("ADMIN", "RECEPCIONISTA"),
    updatePaciente
);

router.delete(
    "/:documento",
    verifyToken,
    authorizeRoles("ADMIN"),
    deletePaciente
);

module.exports = router;