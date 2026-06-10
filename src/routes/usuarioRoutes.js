/** Rutas para la gestión de usuarios. Este archivo define las rutas para obtener la lista de usuarios, obtener un usuario por su documento, 
    actualizar la información de un usuario y eliminar un usuario. Todas las rutas están protegidas por un middleware de autenticación que 
    verifica el token JWT en las solicitudes, y solo los usuarios con el rol de "ADMIN" pueden acceder a estas rutas. Las rutas definidas en 
    este archivo son:
**/

const express = require("express");
const router = express.Router();

const verifyToken =
require("../middlewares/authMiddleware");

const authorizeRoles =
require("../middlewares/roleMiddleware");

const {
    getUsuarios,
    getUsuario,
    updateUsuario,
    deleteUsuario
}
=
require("../controllers/usuarioController");


router.get(
    "/",
    verifyToken,
    authorizeRoles("ADMIN"),
    getUsuarios
);

router.get(
    "/:documento",
    verifyToken,
    authorizeRoles("ADMIN"),
    getUsuario
);

router.put(
    "/:documento",
    verifyToken,
    authorizeRoles("ADMIN"),
    updateUsuario
);

router.delete(
    "/:documento",
    verifyToken,
    authorizeRoles("ADMIN"),
    deleteUsuario
);

module.exports = router;