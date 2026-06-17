/** Middleware de autorización basado en roles. Esta función es un middleware que se utiliza para proteger rutas específicas en la 
    aplicación, permitiendo el acceso solo a usuarios que tengan ciertos roles definidos. 
**/

const authorizeRoles = (...roles) => {

    return (req, res, next) => {

        console.log("Rol del usuario:", req.usuario.rol);
        console.log("Roles permitidos:", roles);

        if (!req.usuario) {
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(403).json({
                message: "Acceso denegado"
            });
        }

        next();

    };

};

module.exports = authorizeRoles;