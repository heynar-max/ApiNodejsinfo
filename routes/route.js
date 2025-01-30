import express from "express";
import logRoutes from "./logRoutes.js"; 
import { verificar, recibir } from "../controller/apicontroller.js";

const router = express.Router();

router.use("/logs", logRoutes); 
router.get("/", verificar);
router.post("/", recibir);

export default router;