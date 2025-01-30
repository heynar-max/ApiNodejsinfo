import express from 'express';
import apiruta from './routes/route.js';
import bodyParser from "body-parser";
import { sequelize } from "./models/Log.js";

const app = express();

// Middleware para procesar JSON
app.use(express.json());
app.use(bodyParser.json());

app.use('/api', apiruta);

const port = process.env.PORT || 5000;
app.listen(port, async () => {
    try {
        await sequelize.authenticate(); // Verificar conexión a DB
        console.log("Conexión a la base de datos establecida correctamente");
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
    }
    console.log(`Server running at http://localhost:${port}`);
});

console.log("hola heynar");