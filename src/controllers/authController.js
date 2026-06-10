/** Controlador para la autenticación de usuarios. Este archivo contiene las funciones para registrar un nuevo usuario, iniciar sesión y 
    obtener el perfil del usuario autenticado. 
**/

const bcrypt = require("bcryptjs");
const generarJWT = require("../helpers/jwt");
const { Usuario } = require("../models");

/**Función para registrar un nuevo usuario. Esta función recibe los datos del usuario a través de la solicitud, crea un nuevo registro en
    la base de datos utilizando el modelo de Usuario, y devuelve la información del usuario registrado. Si ocurre algún error durante el 
    proceso, se devuelve un mensaje de error con el estado correspondiente. 
**/
const register = async (req, res) => {

    try {

        const passwordHash =
            await bcrypt.hash(req.body.password, 10);

        const usuario = await Usuario.create({
            ...req.body,
            password: passwordHash
        });

        res.status(201).json(usuario);

    } catch (error) {

        res.status(500).json({
            message: "Usuario no pudo ser registrado",
            error: error.message
        });

    }

};

/** Función para iniciar sesión. Esta función recibe el correo y la contraseña del usuario a través de la solicitud, verifica si el usuario
    existe en la base de datos, y si la contraseña es correcta utilizando bcryptjs. Si la autenticación es exitosa, se genera un token JWT 
    para el usuario y se devuelve junto con la información del usuario. Si el usuario no existe o la contraseña es incorrecta, se devuelve un 
    mensaje de error con el estado correspondiente. 
**/
const login = async (req, res) => {

    try {

        const { correo, password } = req.body;

        const usuario = await Usuario.findOne({
            where: { correo }
        });

        if (!usuario) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        const valido = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!valido) {

            return res.status(401).json({
                message: "Contraseña incorrecta"
            });

        }

        const token = generarJWT(usuario);

        res.json({
            token,
            usuario
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

/** Función para obtener el perfil del usuario autenticado. Esta función recibe la solicitud con el token JWT, extrae la información del 
    usuario del token, y devuelve la información del usuario autenticado. 
 **/
const profile = async (req, res) => {

    const usuario = await Usuario.findByPk(
        req.usuario.documento
    );

    res.json(usuario);

};

module.exports = {  
    register,
    login,
    profile
};