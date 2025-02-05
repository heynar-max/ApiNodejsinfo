import { request } from "https";

const clientes = {}; // Almacena los datos temporales de los clientes
const tiempoExpiracion = 120000; // 2 minutos en milisegundos

export function EnviarMensajeWhastapp(text, number) {
    text = text.toLowerCase();

    // Reiniciar el temporizador cada vez que el usuario interactúa
    reiniciarTemporizador(number);

    if (!clientes[number]) {
        clientes[number] = { step: "name" };
        sendMessage(number, "👋 ¡Hola! Bienvenido a nuestra tienda de San Valentín ❤️\n\nPor favor, dime tu *nombre* para continuar.");
        return;
    }

    if (clientes[number].step === "name") {
        clientes[number].name = text;
        clientes[number].step = "done";

        sendMessage(number, `✨ ¡Gracias, ${text}! Ahora puedes ver nuestros productos.\n\n📌 Escribe el número del producto para ver más detalles:\n\n1️⃣ Rosa con chocolates 🌹🍫\n2️⃣ Peluche con vino 🧸🍷\n3️⃣ Lapicero y diario ✏️📖`);
        return;
    }

    const productos = {
        "1": {
            "title": "🌹 Rosa con Chocolates",
            "price": "$10",
            "description": "📌 Incluye una rosa importada de Colombia y una caja de chocolates Ferrero Rocher.\n\n🎁 Un detalle perfecto para San Valentín. 💖",
            "image": "https://i.pinimg.com/474x/a8/8e/44/a88e446d097458cf30f5bc675a331de7.jpg",
            "id": "comprar_rosa"
        },
        "2": {
            "title": "🧸 Peluche con Vino",
            "price": "$20",
            "description": "📌 Incluye un peluche de alta calidad y una botella de vino *Casillero del Diablo*.\n\n🎁 Perfecto para una velada romántica. 🍷💘",
            "image": "https://i.pinimg.com/236x/9f/52/01/9f52012882384f7e8d50c43dcb773084.jpg",
            "id": "comprar_peluche"
        },
        "3": {
            "title": "✏️ Lapicero y Diario",
            "price": "$5",
            "description": "📌 Incluye un elegante diario de cuero y un lapicero metálico.\n\n🎁 Ideal para quienes aman escribir. 📝✨",
            "image": "https://i.pinimg.com/474x/d9/f7/d4/d9f7d4a546537df69ba0d5ded381ea49.jpg",
            "id": "comprar_lapicero"
        }
    };

    if (text === "1" || text === "2" || text === "3") {
        let product = productos[text];

        const data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "interactive",
            "interactive": {
                "type": "button",
                "header": {
                    "type": "image",
                    "image": {
                        "link": product.image
                    }
                },
                "body": {
                    "text": `${product.title} – ${product.price}\n\n${product.description}`
                },
                "footer": {
                    "text": "¿Quieres comprar este producto?"
                },
                "action": {
                    "buttons": [
                        {
                            "type": "reply",
                            "reply": {
                                "id": product.id,
                                "title": "🛒 Comprar ahora"
                            }
                        }
                    ]
                }
            }
        });

        sendRequest(data);
        return;
    }

    if (text.includes("comprar_")) {
        let producto = text.includes("rosa") ? "🌹 Rosa con Chocolates" :
                      text.includes("peluche") ? "🧸 Peluche con Vino" :
                      "✏️ Lapicero y Diario";

        clientes[number].step = "email"; // Ahora solicita el email
        sendMessage(number, `✅ *${clientes[number].name}*, has seleccionado *${producto}*.\n\nAntes de continuar con el pago, por favor ingresa tu *correo electrónico*.`);
        return;
    }

    if (clientes[number].step === "email") {
        clientes[number].email = text;
        clientes[number].step = "payment";

        sendMessage(number, `📧 ¡Gracias! Tu correo es *${text}*.\n\n💳 Ahora, selecciona tu método de pago:\n\n- *Efectivo* 💵\n- *Transferencia bancaria* 🏦\n- *Pago con tarjeta* 💳`);
        return;
    }

    sendMessage(number, `🚀 No entendí tu mensaje, *${clientes[number].name}*. Escribe *hola* para ver las opciones de productos. 😊`);
}

// Función para enviar mensajes de WhatsApp
function sendMessage(number, message) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "text",
        "text": {
            "preview_url": false,
            "body": message
        }
    });

    sendRequest(data);
}

// Función para enviar peticiones a la API de WhatsApp
function sendRequest(data) {
    const option = {
        host: "graph.facebook.com",
        path: "/v21.0/586933011161982/messages",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer EAAGXpgKoZBOgBO5bcgM4JAZBDTQZCyolZCDpBQVp2l9kLZC4cubvR2OOy4RGBGj98nJCEOcCFAFaz7IDEJcZA228IC8ewuAm0xbheos80Pe6KEJOnTLCrQJBLSJN7K1O7UlHjMBOrsFHsZCNrKAEbPYWuMtne0x2jgocspAto9QPLwoAR6oc1kvRZCQAZAKia8CfqQQZDZD"
        }
    };

    const req = request(option, res => {
        res.on("data", d => {
            process.stdout.write(d);
        });
    });

    req.write(data);
    req.end();
}

// Función para manejar la inactividad
function reiniciarTemporizador(number) {
    if (!clientes[number]) {
        clientes[number] = {}; // Inicializar si no existe
    }

    if (clientes[number].timeout) {
        clearTimeout(clientes[number].timeout);
    }

    clientes[number].timeout = setTimeout(() => {
        delete clientes[number]; // Elimina los datos del cliente tras 2 minutos de inactividad
        sendMessage(number, "⏳ Parece que no has respondido en un tiempo. Vamos a empezar de nuevo. \n\nEscribe *hola* para volver a iniciar la conversación. 😊");
    }, tiempoExpiracion);
}