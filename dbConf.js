const mongoose = require("mongoose");

const mongoDbInit = () => {
    mongoose.connect("mongodb://localhost/findmyteam", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err)
            console.error("ERROR: Fallo de conexion con la Base de Datos." + err);
        else
            console.log("Base de datos Conectada");
    });
};

module.exports = {
    mongoDbInit: mongoDbInit,
}