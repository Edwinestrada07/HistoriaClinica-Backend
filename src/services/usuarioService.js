/** Servicio para la gestión de usuarios. Este archivo contiene la lógica para crear un nuevo usuario en la base de datos. 
    La función "crearUsuario" recibe un objeto con los datos del usuario, verifica si el correo ya está registrado, y si no es así, 
    encripta la contraseña utilizando bcryptjs antes de guardar el nuevo usuario en la base de datos. Si el correo ya existe, 
    se lanza un error indicando que el correo ya está registrado. 
**/

const bcrypt = require("bcryptjs");
const { Usuario } = require("../models");

const crearUsuario = async (data) => {

    const existeCorreo = await Usuario.findOne({
        where: { correo: data.correo }
    });

    if (existeCorreo) {
        throw new Error("El correo ya está registrado");
    }

    const passwordHash = await bcrypt.hash(
        data.password,
        10
    );

    const usuario = await Usuario.create({
        ...data,
        password: passwordHash
    });

    return usuario;
};

module.exports = {
    crearUsuario
};