/** Configuración de la aplicación Express. Este archivo es el punto de entrada para configurar el servidor Express, incluyendo 
    middlewares como CORS para permitir solicitudes desde diferentes orígenes, Morgan para el registro de solicitudes HTTP, y 
    express.json() para analizar el cuerpo de las solicitudes en formato JSON. Aquí se exporta la instancia de la aplicación Express 
    para ser utilizada en otros archivos, como el archivo de rutas o el archivo principal del servidor.
**/

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);

module.exports = app;