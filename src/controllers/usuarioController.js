/** Controlador para la gestión de usuarios. Este archivo contiene las funciones para obtener la lista de usuarios, obtener un usuario por su 
    documento, actualizar la información de un usuario y eliminar un usuario. Estas funciones interactúan con el modelo de Usuario para realizar las
    operaciones correspondientes en la base de datos y devuelven las respuestas adecuadas al cliente. 
**/

const { Usuario } = require("../models");

/** Función para obtener la lista de TODOS los usuarios registrados en la base de datos. Esta función utiliza el modelo de Usuario para recuperar
    todos los registros de usuarios y devuelve la información en formato JSON al cliente. 
**/
const getUsuarios = async (req, res) => {

    const usuarios =
        await Usuario.findAll();

    res.json(usuarios);

};

/** Función para obtener UN usuario por su documento. Esta función recibe el documento del usuario a través de los parámetros de la solicitud,
    utiliza el modelo de Usuario para buscar el registro correspondiente en la base de datos, y devuelve la información del usuario en formato JSON al cliente. 
**/
const getUsuario = async (req, res) => {

    const usuario =
        await Usuario.findByPk(
            req.params.documento
        );

    res.json(usuario);

};

/** Función para actualizar la información de un usuario. Esta función recibe el documento del usuario a través de los parámetros de la solicitud,
    utiliza el modelo de Usuario para buscar el registro correspondiente en la base de datos, y actualiza la información del usuario con los datos proporcionados.
    Devuelve la información actualizada del usuario en formato JSON al cliente. 
**/
const updateUsuario = async (req, res) => {

    const usuario =
        await Usuario.findByPk(
            req.params.documento
        );

    await usuario.update(req.body);

    res.json(usuario);

};

/** Función para eliminar un usuario. Esta función recibe el documento del usuario a través de los parámetros de la solicitud, utiliza el modelo de Usuario
    para buscar el registro correspondiente en la base de datos, y lo elimina. Devuelve un mensaje de confirmación en formato JSON al cliente. 
**/
const deleteUsuario = async (req, res) => {

    const usuario =
        await Usuario.findByPk(
            req.params.documento
        );

    await usuario.destroy();

    res.json({
        message: "Usuario eliminado"
    });

};

module.exports = {
    getUsuarios,
    getUsuario,
    updateUsuario,
    deleteUsuario
};