/** Rutas de autenticación para el manejo de registro, inicio de sesión y perfil de usuario. Este archivo define las rutas para registrar 
    un nuevo usuario, iniciar sesión y obtener el perfil del usuario autenticado. Las rutas están protegidas por un middleware de autenticación 
    que verifica el token JWT en las solicitudes. 
**/

const express = require("express");
const router = express.Router();

const {
    register,
    login,
    profile
} = require("../controllers/authController");

const verifyToken =
    require("../middlewares/authMiddleware");

router.post("/register", register);

router.post("/login", login);

router.get(
    "/profile",
    verifyToken,
    profile
);

module.exports = router;