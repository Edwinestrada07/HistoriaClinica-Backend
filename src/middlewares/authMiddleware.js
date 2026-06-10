/** Middleware para verificar la autenticación de los usuarios utilizando tokens JWT. Este middleware se encarga de extraer el token de
    la cabecera de autorización de la solicitud, verificar su validez utilizando la clave secreta definida en el archivo .env 
**/

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  try {

    const token =
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token requerido"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.usuario = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Token inválido"
    });

  }

};

module.exports = verifyToken;