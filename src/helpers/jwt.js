/** Función para generar un token JWT (JSON Web Token) para la autenticación de usuarios. Esta función toma un objeto de usuario como 
    argumento y utiliza la biblioteca jsonwebtoken para crear un token firmado con una clave secreta definida en el archivo .env. 
    El token incluye información relevante del usuario, como su documento y rol, y tiene una duración de 1 hora antes de expirar. 
**/

const jwt = require("jsonwebtoken");

const generarJWT = (usuario) => {

  return jwt.sign(
    {
      documento: usuario.documento,
      rol: usuario.rol
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h"
    }
  );

};

module.exports = generarJWT;