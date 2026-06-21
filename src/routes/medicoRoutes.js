/** Rutas para la gestión de médicos. Estas rutas permiten a los usuarios con los roles adecuados crear, obtener, actualizar y eliminar 
    médicos en el sistema. Cada ruta está protegida por un middleware de autenticación que verifica el token JWT en las solicitudes, y un 
    middleware de autorización que permite el acceso solo a usuarios con los roles "ADMIN" o "RECEPCIONISTA" según la operación. 
**/

const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const {postMedico, getMedicos, getMedico, updateMedico,deleteMedico} = require("../controllers/medicoController");

router.post(
    "/",
    verifyToken,
    authorizeRoles("ADMIN"),
    postMedico
);

router.get(
    "/",
    verifyToken,
    authorizeRoles("ADMIN", "RECEPCIONISTA"),
    getMedicos
);

router.get(
    "/:documento",
    verifyToken,
    authorizeRoles("ADMIN", "RECEPCIONISTA"),
    getMedico
);

router.put(
    "/:documento",
    verifyToken,
    authorizeRoles("ADMIN"),
    updateMedico
);

router.delete(
    "/:documento",
    verifyToken,
    authorizeRoles("ADMIN"),
    deleteMedico
);

module.exports = router;