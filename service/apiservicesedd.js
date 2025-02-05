import { request } from "https";

const clientes = {}; // Almacena los datos temporales de los clientes

export function EnviarMensajeWhastapp(text, number) {
    text = text.toLowerCase();

    // Palabra clave para retroceder un paso
    const palabrasVolver = ["atrás", "volver"];

    if (palabrasVolver.includes(text)) {
        retrocederPaso(number);
        return;
    }

    if (!clientes[number]) {
        clientes[number] = { step: "solicitar_nombre", historial: [] };
        sendMessage(number, "👋 ¡Hola! Bienvenido/a a nuestra tienda de San Valentín ❤️. Por favor, dime tu *nombre* para continuar.");
        return;
    }

    switch (clientes[number].step) {
        case "solicitar_nombre":
            clientes[number].nombre = text;
            clientes[number].step = "saludo";
            clientes[number].historial.push("solicitar_nombre"); // Guardar el paso actual en el historial
            sendMessage(number, `✨ ¡Gracias, ${text}! ¿Te gustaría ver nuestros productos? (Responde con 'sí' o 'no')`);
            break;

        case "saludo":
            if (text === "sí" || text === "si") {
                clientes[number].step = "mostrar_productos";
                clientes[number].historial.push("saludo"); // Guardar el paso actual en el historial
                sendMessage(number, "¡Genial! Estos son nuestros productos:\n\n1️⃣ Rosa con chocolates - $10\n2️⃣ Peluche con vino - $20\n3️⃣ Lapicero y diario - $5\n\n¿Quieres ver fotos de algún producto? Escribe el número o 'todas' para verlas todas.");
            } else {
                sendMessage(number, "¡No hay problema! Si cambias de opinión, aquí estaré para ayudarte. 😊");
            }
            break;

        case "mostrar_productos":
            if (text === "todas") {
                sendMessage(number, "Aquí tienes las imágenes de todos los productos:\n\n1️⃣ Rosa con chocolates: [URL_IMAGEN_ROSA]\n2️⃣ Peluche con vino: [URL_IMAGEN_PELUCHE]\n3️⃣ Lapicero y diario: [URL_IMAGEN_LAPICERO]");
            } else if (text === "1" || text === "2" || text === "3") {
                const producto = getProducto(text);
                clientes[number].productoSeleccionado = producto;
                clientes[number].step = "proceso_compra";
                clientes[number].historial.push("mostrar_productos"); // Guardar el paso actual en el historial
                sendMessage(number, `Aquí tienes la imagen de ${producto.title}: ${producto.image}\n\n¿Te gustaría comprarlo? (Responde con 'sí' o 'no')`);
            } else {
                sendMessage(number, "Opción no válida. Por favor, elige un número del 1 al 3 o escribe 'todas'.");
            }
            break;

        case "proceso_compra":
            if (text === "sí" || text === "si") {
                clientes[number].step = "confirmar_cantidad";
                clientes[number].historial.push("proceso_compra"); // Guardar el paso actual en el historial
                sendMessage(number, "¡Perfecto! ¿Cuántas unidades deseas?");
            } else {
                clientes[number].step = "saludo";
                sendMessage(number, "¡No hay problema! Si necesitas ayuda con otra cosa, dime. 😊");
            }
            break;

        case "confirmar_cantidad":
            const cantidad = parseInt(text);
            if (!isNaN(cantidad) && cantidad > 0) {
                clientes[number].cantidad = cantidad;
                const total = clientes[number].productoSeleccionado.price * cantidad;
                clientes[number].step = "confirmar_pago";
                clientes[number].historial.push("confirmar_cantidad"); // Guardar el paso actual en el historial
                sendMessage(number, `¡Genial! El total es de $${total}. ¿Cómo te gustaría pagar? (Efectivo, transferencia, tarjeta)`);
            } else {
                sendMessage(number, "Por favor, ingresa una cantidad válida.");
            }
            break;

        case "confirmar_pago":
            clientes[number].metodoPago = text;
            clientes[number].step = "confirmar_direccion";
            clientes[number].historial.push("confirmar_pago"); // Guardar el paso actual en el historial
            sendMessage(number, "¿Dónde te gustaría recibir tu pedido? (Dame tu dirección o dime si prefieres recogerlo)");
            break;

        case "confirmar_direccion":
            clientes[number].direccion = text;
            clientes[number].step = "saludo"; // Reiniciar el flujo
            sendMessage(number, `¡Gracias por tu compra, ${clientes[number].nombre}! 🎁 Tu pedido será entregado en breve. Cualquier duda, escríbeme.`);
            break;

        default:
            sendMessage(number, "¡Hola! ¿En qué puedo ayudarte?");
            clientes[number].step = "solicitar_nombre";
            break;
    }
}

// Función para retroceder un paso
function retrocederPaso(number) {
    const historial = clientes[number].historial;
    if (historial.length > 0) {
        const pasoAnterior = historial.pop(); // Obtener el último paso del historial
        clientes[number].step = pasoAnterior; // Retroceder al paso anterior
        switch (pasoAnterior) {
            case "solicitar_nombre":
                sendMessage(number, "👋 Por favor, dime tu *nombre* para continuar.");
                break;
            case "saludo":
                sendMessage(number, `✨ ¿Te gustaría ver nuestros productos, ${clientes[number].nombre}? (Responde con 'sí' o 'no')`);
                break;
            case "mostrar_productos":
                sendMessage(number, "¡Genial! Estos son nuestros productos:\n\n1️⃣ Rosa con chocolates - $10\n2️⃣ Peluche con vino - $20\n3️⃣ Lapicero y diario - $5\n\n¿Quieres ver fotos de algún producto? Escribe el número o 'todas' para verlas todas.");
                break;
            case "proceso_compra":
                sendMessage(number, `Aquí tienes la imagen de ${clientes[number].productoSeleccionado.title}: ${clientes[number].productoSeleccionado.image}\n\n¿Te gustaría comprarlo? (Responde con 'sí' o 'no')`);
                break;
            case "confirmar_cantidad":
                sendMessage(number, "¡Perfecto! ¿Cuántas unidades deseas?");
                break;
            case "confirmar_pago":
                const total = clientes[number].productoSeleccionado.price * clientes[number].cantidad;
                sendMessage(number, `¡Genial! El total es de $${total}. ¿Cómo te gustaría pagar? (Efectivo, transferencia, tarjeta)`);
                break;
            default:
                sendMessage(number, "¡Hola! ¿En qué puedo ayudarte?");
                break;
        }
    } else {
        sendMessage(number, "No hay pasos anteriores. ¿En qué puedo ayudarte?");
    }
}

function getProducto(numero) {
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
    return productos[numero];
}

function sendMessage(number, message) {
    const data = JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: number,
        type: "text",
        text: {
            preview_url: false,
            body: message
        }
    });

    sendRequest(data);
}

function sendRequest(data) {
    const option = {
        host: "graph.facebook.com",
        path: "/v21.0/586933011161982/messages",
        method: "POST",
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