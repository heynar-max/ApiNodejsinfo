import { Log } from "../models/Log.js";
import { EnviarMensajeWhastapp } from "../service/apiservice.js";

export const verificar = (req, res) => {
    try {
        const tokenheynar = "HEYNARAPIMETA";
        const token = req.query["hub.verify_token"];
        const challenge = req.query["hub.challenge"];

        if (token && challenge && token === tokenheynar) {
            return res.status(200).send(challenge);
        } else {
            return res.status(403).send("Verificación fallida: Token inválido");
        }
    } catch (error) {
        console.error("Error en la verificación del webhook:", error.message);
        return res.status(500).send("Error interno del servidor");
    }
};

export const recibir = async (req, res) => {
    try {
        const entry = req.body["entry"]?.[0];
        const changes = entry?.["changes"]?.[0];
        const value = changes?.["value"];
        const objetoMensaje = value?.["messages"];

        if (!objetoMensaje) {
            return res.send("EVENT_RECEIVED");
        }

        const type = objetoMensaje[0]["type"];
        console.log("Tipo de mensaje recibido:", type);

        let logText = `Tipo de mensaje: ${type} `;

        if (type === "interactive") {
            const typeInteractive = objetoMensaje[0]["interactive"]["type"];
            const number = objetoMensaje[0]["from"];
            let text = "";

            if (typeInteractive === "button_reply") {
                text = objetoMensaje[0]["interactive"]["button_reply"]["id"];
                EnviarMensajeWhastapp(text, number);
            } else if (typeInteractive === "list_reply") {
                text = objetoMensaje[0]["interactive"]["list_reply"]["id"];
                console.log(text);
                EnviarMensajeWhastapp(text, number);
            }

            logText += `| Interactivo: ${text} | De: ${number}`;
        }

        if (objetoMensaje[0]?.["text"]) {
            const text = objetoMensaje[0]["text"]["body"];
            const number = objetoMensaje[0]["from"];
            console.log(`Mensaje recibido de ${number}: ${text}`);
            EnviarMensajeWhastapp(text, number);

            logText += `| Mensaje: ${text} | De: ${number}`;
        }

        // Guardar en la base de datos
        await Log.create({ texto: logText });

        res.send("EVENT_RECEIVED");
    } catch (error) {
        console.error("Error procesando el mensaje:", error);
        res.send("EVENT_RECEIVED");
    }
};

