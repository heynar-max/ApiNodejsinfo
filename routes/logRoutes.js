import express from "express";
import { Log } from "../models/Log.js";

const router = express.Router();

// Obtener todos los logs
router.get("/", async (req, res) => {
    try {
        const logs = await Log.findAll();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Agregar un nuevo log
router.post("/", async (req, res) => {
    try {
        const { texto } = req.body;
        const newLog = await Log.create({ texto });
        res.json(newLog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;