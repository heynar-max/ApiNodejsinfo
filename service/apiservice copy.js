import { request } from "https";

export function EnviarMensajeWhastapp  (text, number) {
    
    text = text.toLowerCase();

    let data;

    if (text.includes("hola")) {
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "🎁 Hola, bienvenido. ¿Te gustaría ver nuestros productos de San Valentín? ❤️ Responde con *sí* o *no*."
            }
        });
    } else if (text.includes("sí")) {
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "to": number,
            "type": "interactive",
            "interactive": {
                "type": "list",
                "body": {
                    "text": "Estos son nuestros productos especiales de San Valentín. Elige uno para más detalles."
                },
                "footer": {
                    "text": "Selecciona un producto para más información"
                },
                "action": {
                    "button": "Ver productos",
                    "sections": [
                        {
                            "title": "Regalos de San Valentín",
                            "rows": [
                                {
                                    "id": "sanvalentin_1",
                                    "title": "🌹 Rosa con chocolates - $10",
                                    "description": "Un detalle romántico con una rosa y chocolates Ferrero."
                                },
                                {
                                    "id": "sanvalentin_2",
                                    "title": "🧸 Peluche con vino - $20",
                                    "description": "Un tierno peluche acompañado de una botella de vino."
                                },
                                {
                                    "id": "sanvalentin_3",
                                    "title": "📔 Lapicero y diario - $5",
                                    "description": "Un elegante diario con un lapicero de calidad."
                                }
                            ]
                        }
                    ]
                }
            }
        });
    } else if (text.includes("sanvalentin_1")) {
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "🌹 **Rosa con chocolates** - $10\n💖 Incluye:\n- 1 rosa importada\n- Chocolates Ferrero Rocher\n- Presentación elegante\n¿Te gustaría comprarlo? Responde con *comprar 1*."
            }
        });
    } else if (text.includes("sanvalentin_2")) {
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "🧸 **Peluche con vino** - $20\n🍷 Incluye:\n- Peluche de 25 cm\n- Botella de vino tinto (750ml)\n- Presentación en caja de regalo\n¿Te gustaría comprarlo? Responde con *comprar 2*."
            }
        });
    } else if (text.includes("sanvalentin_3")) {
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "📔 **Lapicero y diario** - $5\n✍️ Incluye:\n- Lapicero tinta gel Parker\n- Diario de cuero sintético\n- Presentación en estuche\n¿Te gustaría comprarlo? Responde con *comprar 3*."
            }
        });
    } else if (text.includes("comprar")) {
        let producto = text.split(" ")[1];
        let mensaje = "¡Gracias por tu compra! ";

        if (producto == "1") mensaje += "Te contactaremos para entregarte tu Rosa con chocolates. 🌹🍫";
        else if (producto == "2") mensaje += "Te contactaremos para entregarte tu Peluche con vino. 🧸🍷";
        else if (producto == "3") mensaje += "Te contactaremos para entregarte tu Lapicero y diario. 📔✍️";
        else mensaje = "No reconocemos tu opción, intenta de nuevo.";

        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": mensaje
            }
        });
    } else {
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "🚀 Hola, visita mi web https://portafoliu.vercel.app para más información. Escribe *boton* o *lista* para más opciones.\n\n📌 Por favor, ingresa un número para recibir información.\n\n1️⃣. Información del bot. ❔\n2️⃣. Ubicación del local. 📍\n3️⃣. Enviar temario en PDF. 📄\n4️⃣. Audio explicando bot. 🎧\n5️⃣. Video de introducción. ⏯️\n6️⃣. Hablar con Heynar. 🙋‍♂️\n7️⃣. Horario de atención. 🕜"
            }
        });
    }

    const option = {
        host : "graph.facebook.com",
        path : "/v21.0/586933011161982/messages",
        method : "POST",
        body : data,
        headers : {
            "Content-Type" : "application/json",
            Authorization :"Bearer EAAGXpgKoZBOgBO5bcgM4JAZBDTQZCyolZCDpBQVp2l9kLZC4cubvR2OOy4RGBGj98nJCEOcCFAFaz7IDEJcZA228IC8ewuAm0xbheos80Pe6KEJOnTLCrQJBLSJN7K1O7UlHjMBOrsFHsZCNrKAEbPYWuMtne0x2jgocspAto9QPLwoAR6oc1kvRZCQAZAKia8CfqQQZDZD"
        }
    };

    const req = request(option,res => {
        res.on("data",d=>{
            process.stdout.write(d);
        });
    });

    req.write(data);
    req.end();
};
