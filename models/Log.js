import { Sequelize, DataTypes } from "sequelize";

// Configuración de la base de datos SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "metapython.db",
});

// Definir el modelo Log
const Log = sequelize.define(
    "Log",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fecha_y_hora: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
        },
        texto: {
            type: DataTypes.TEXT,
        },
    },
    {
        timestamps: false,
    }
);

// Sincronizar la base de datos
sequelize.sync()
    .then(() => console.log("Tabla Log creada"))
    .catch((error) => console.error("Error al sincronizar:", error));

export { sequelize, Log };