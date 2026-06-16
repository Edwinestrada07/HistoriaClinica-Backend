/** Configuración del servidor Express. Este archivo es el punto de entrada principal para iniciar el servidor Express. Aquí se 
    establece la conexión a la base de datos utilizando Sequelize, se sincronizan los modelos con la base de datos, y se inicia el 
    servidor en un puerto específico. Además, se maneja cualquier error que pueda ocurrir durante la conexión a la base de datos o 
    el inicio del servidor. 
**/

require("dotenv").config();

const app = require("./app");
const sequelize = require("./database/database");

require("./models");

const PORT = process.env.PORT || 3000;

async function main() {
    try {

        await sequelize.authenticate();

        console.log("Base de datos conectada");

        await sequelize.sync({
            alter: true
        });

        console.log("Modelos sincronizados");

        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en puerto ${PORT}`);
        });

    } catch (error) {
        console.error(error);
    }
}

main();