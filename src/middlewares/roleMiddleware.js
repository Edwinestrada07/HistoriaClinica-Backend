/** Middleware de autorización basado en roles. Esta función es un middleware que se utiliza para proteger rutas específicas en la 
    aplicación, permitiendo el acceso solo a usuarios que tengan ciertos roles definidos. 
**/

const authorizeRoles = (...roles) => {

  return (req, res, next) => {

    if (!roles.includes(req.usuario.rol)) {

      return res.status(403).json({
        message: "Acceso denegado"
      });

    }

    next();

  };

};

module.exports = authorizeRoles;