import { EnviarCorreoCompra } from "./service/mailService.js";


EnviarCorreoCompra("123456789", "Puppy Love 🧸")
    .then(() => console.log("✅ Correo de prueba enviado."))
    .catch(error => console.error("❌ Error en la prueba:", error));