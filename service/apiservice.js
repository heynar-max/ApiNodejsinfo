
import { request } from "https";
import { EnviarCorreoCompra } from "./mailService.js";

const userState = {}; // Para almacenar el estado del usuario

export function EnviarMensajeWhastapp(text, number) {
    text = text.toLowerCase();

    if (!userState[number]) {
        userState[number] = { stage: "ask_name", productos: [] }; // Inicializar el array de productos
    }

    let data;

    if (userState[number].stage === "ask_name") {
        userState[number].stage = "greet";
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "¡Hola! 😊 Antes de continuar, ¿puedes decirme tu nombre?"
            }
        });
    } else if (userState[number].stage === "greet") {
        userState[number].name = text;
        userState[number].stage = "product_selection";
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "to": number,
            "type": "interactive",
            "interactive": {
                "type": "button",
                "body": {
                    "text": `👋 ¡Hola ${text}! Bienvenido. ¿Te gustaría conocer más sobre nuestros productos?`
                },
                "footer": {
                    "text": "Selecciona una de las opciones"
                },
                "action": {
                    "buttons": [
                        {
                            "type": "reply",
                            "reply": {
                                "id": "btnsi",
                                "title": "Sí"
                            }
                        },
                        {
                            "type": "reply",
                            "reply": {
                                "id": "btnno",
                                "title": "No"
                            }
                        }
                    ]
                }
            }
        });
    } else if (text.includes("gracias")) {
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "Gracias a ti por contactarme. 🤩"
            }
        });
    } else if (text.includes("adios") || text.includes("bye") || text.includes("nos vemos")) {
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "Hasta luego. 🌟"
            }
        });
    } else if (text.includes("btnsi")) {
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "to": number,
            "type": "interactive",
            "interactive": {
                "type": "button",
                "body": {
                    "text": "Select one of these options"
                },
                "footer": {
                    "text": "Select one of these options"
                },
                "action": {
                    "buttons": [
                        {
                            "type": "reply",
                            "reply": {
                                "id": "producto1",
                                "title": "Sweetheart 🧸 White"
                            }
                        },
                        {
                            "type": "reply",
                            "reply": {
                                "id": "producto2",
                                "title": "Puppy Love 🧸"
                            }
                        },
                        {
                            "type": "reply",
                            "reply": {
                                "id": "producto3",
                                "title": "Sweetheart 🧸 Brown"
                            }
                        }
                    ]
                }
            }
        });
    } else if (text.includes("btnno")) {
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "Entiendo, muchas gracias."
            }
        });
    } else if (text.includes("producto1")) {
        userState[number].productos = [...userState[number].productos, "Sweetheart 🧸 White"]; // Agregar producto usando spread operator
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "interactive",
            "interactive": {
                "type": "button",
                "header": {
                    "type": "image",
                    "image": {
                        "link": "https://res.cloudinary.com/dzty81hol/image/upload/v1738879497/kwocjvsoayoz8wsdawz8.jpg",
                    }
                },
                "body": {
                    "text": "📌 Includes Sweetheart Teddy White - 12 Ferrero Rocher - 1 Heart Balloon - 1 Rice Krispies Treats 2.2 oz.\n\n🎁 A perfect detail for Valentine's Day. 💖\n\n💵 Price: $50",
                },
                "footer": {
                    "text": "¿Quieres comprar este producto?"
                },
                "action": {
                    "buttons": [
                        {
                            "type": "reply",
                            "reply": {
                                "id": "adquicompra",
                                "title": "🛒 adquirir ahora"
                            }
                        },
                        {
                            "type": "reply",
                            "reply": {
                                "id": "producto2",
                                "title": "Puppy Love 🧸"
                            }
                        },
                        {
                            "type": "reply",
                            "reply": {
                                "id": "producto3",
                                "title": "Sweetheart 🧸 Brown"
                            }
                        }
                    ]
                }
            }
        });
    } else if (text.includes("producto2")) {
        userState[number].productos = [...userState[number].productos, "Puppy Love 🧸"]; // Agregar producto usando spread operator
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "interactive",
            "interactive": {
                "type": "button",
                "header": {
                    "type": "image",
                    "image": {
                        "link": "https://res.cloudinary.com/dzty81hol/image/upload/v1738879497/wlasox3w4jxlxgvjiycj.jpg",
                    }
                },
                "body": {
                    "text": "📌 Includes Pirouline - 2 Golden Oreos Vanilla 22g - 12 Ferrero Rocher - 1 Heart Balloon - 1 Business card.\n\n🎁 A perfect detail for Valentine's Day. 💖\n\n💵 Price: $40",
                },
                "footer": {
                    "text": "¿Quieres comprar este producto?"
                },
                "action": {
                    "buttons": [
                        {
                            "type": "reply",
                            "reply": {
                                "id": "adquicompra",
                                "title": "🛒 adquirir ahora"
                            }
                        },
                        {
                            "type": "reply",
                            "reply": {
                                "id": "producto1",
                                "title": "Sweetheart 🧸 White"
                            }
                        },
                        {
                            "type": "reply",
                            "reply": {
                                "id": "producto3",
                                "title": "Sweetheart 🧸 Brown"
                            }
                        }
                    ]
                }
            }
        });
    } else if (text.includes("producto3")) {
        userState[number].productos = [...userState[number].productos, "Sweetheart 🧸 Brown"]; // Agregar producto usando spread operator
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "interactive",
            "interactive": {
                "type": "button",
                "header": {
                    "type": "image",
                    "image": {
                        "link": "https://res.cloudinary.com/dzty81hol/image/upload/v1738879699/nlsrnjdnxtzcbqnc4o27.jpg",
                    }
                },
                "body": {
                    "text": "📌 Includes Sweetheart Teddy Brown - 6 Ferrero Rocher - 1 Heart Balloon - 1 Business card.\n\n🎁 A perfect detail for Valentine's Day. 💖\n\n💵 Price: $50",
                },
                "footer": {
                    "text": "¿Quieres comprar este producto?"
                },
                "action": {
                    "buttons": [
                        {
                            "type": "reply",
                            "reply": {
                                "id": "adquicompra",
                                "title": "🛒 adquirir ahora"
                            }
                        },
                        {
                            "type": "reply",
                            "reply": {
                                "id": "producto1",
                                "title": "Sweetheart 🧸 White"
                            }
                        },
                        {
                            "type": "reply",
                            "reply": {
                                "id": "producto2",
                                "title": "Puppy Love 🧸"
                            }
                        },
                    ]
                }
            }
        });
    } else if (text.includes("adquicompra")) {
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "interactive",
            "interactive": {
                "type": "button",
                "header": {
                    "type": "image",
                    "image": {
                        "link": "https://res.cloudinary.com/dzty81hol/image/upload/v1739047274/wievcbvgb4hfvmkraoby.png",
                    }
                },
                "body": {
                    "text": "📌 Te gustaria adicionar un producto más?",
                },
                "footer": {
                    "text": "¿escoge el de su interes?"
                },
                "action": {
                    "buttons": [
                        {
                            "type": "reply",
                            "reply": {
                                "id": "adici",
                                "title": "✅ Si"
                            }
                        },
                        {
                            "type": "reply",
                            "reply": {
                                "id": "compra",
                                "title": "❌ No"
                            }
                        },
                    ]
                }
            }
        });
    } else if (text.includes("adici")) {
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "to": number,
            "type": "interactive",
            "interactive": {
                "type": "list",
                "body": {
                    "text": "Selecciona algun producto"
                },
                "footer": {
                    "text": "Selecciona el de su interes"
                },
                "action": {
                    "button": "Ver opciones",
                    "sections": [
                        {
                            "title": "Productos de $1.5",
                            "rows": [
                                {
                                    "id": "adi1",
                                    "title": "Mani Planters",
                                    "description": "Mani Planters 6oz sal y vinagre"
                                },
                                {
                                    "id": "adi2",
                                    "title": "Oreo mini",
                                    "description": "Oreo mini golden 3oz"
                                },
                                {
                                    "id": "adi3",
                                    "title": "5 Mounds",
                                    "description": "5 Mounds 3oz"
                                },
                                {
                                    "id": "adi4",
                                    "title": "M & M",
                                    "description": "M & M  3.1oz"
                                },
                                {
                                    "id": "adi5",
                                    "title": "Rice Krispies",
                                    "description": "Rice Krispies 2.2oz "
                                }
                            ]
                        },
                        {
                            "title": "Salir, terminar compra",
                            "rows": [
                                {
                                    "id": "compra",
                                    "title": "compra",
                                    "description": "❌ terminar compra."
                                },
                            ]
                        }
                    ]
                }
            }
        });
    } else if (text.includes("adi1")) {
        userState[number].productos = [...userState[number].productos, "Mani Planters"]; // Agregar producto usando spread operator
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "interactive",
            "interactive": {
                "type": "button",
                "header": {
                    "type": "image",
                    "image": {
                        "link": "https://res.cloudinary.com/dzty81hol/image/upload/v1739050130/ibim3vm1n9dna7raqd62.jpg",
                    }
                },
                "body": {
                    "text": "📌 Includes mani planters sea salt & vinegar.\n\n🎁 A perfect detail for Valentine's Day. 💖\n\n💵 Price: $1.5",
                },
                "footer": {
                    "text": "¿Quieres comprar este producto?"
                },
                "action": {
                    "buttons": [
                        {
                            "type": "reply",
                            "reply": {
                                "id": "adquicompra",
                                "title": "🛒 agregar ahora"
                            }
                        },
                        {
                            "type": "reply",
                            "reply":{
                                "id":"adici",
                                "title":"➡️ Más Productos"
                            }
                        },
                        {
                            "type": "reply",
                            "reply":{
                                "id":"compra",
                                "title":"❌ terminar compra"
                            }
                        },
                    ]
                }
            }
        });
    // } else if (text.includes("adi2")) {
    //     userState[number].productos = [...userState[number].productos, "Oreo mini"]; // Agregar producto usando spread operator
    //     data = JSON.stringify({
    //         "messaging_product": "whatsapp",
    //         "recipient_type": "individual",
    //         "to": number,
    //         "type": "interactive",
    //         "interactive": {
    //             "type": "button",
    //             "header": {
    //                 "type": "image",
    //                 "image": {
    //                     "link": "https://res.cloudinary.com/dzty81hol/image/upload/v1739050130/vj6i48n2okzwqqrx6cqz.jpg",
    //                 }
    //             },
    //             "body": {
    //                 "text": "📌 Includes Oreo mini golden.\n\n🎁 A perfect detail for Valentine's Day. 💖\n\n💵 Price: $1.5",
    //             },
    //             "footer": {
    //                 "text": "¿Quieres comprar este producto?"
    //             },
    //             "action": {
    //                 "buttons": [
    //                     {
    //                         "type": "reply",
    //                         "reply": {
    //                             "id": "adquicompra",
    //                             "title": "🛒 agregar ahora"
    //                         }
    //                     },
    //                     {
    //                         "type": "reply",
    //                         "reply":{
    //                             "id":"adi1",
    //                             "title":"Mani Planters"
    //                         }
    //                     },
    //                     {
    //                         "type": "reply",
    //                         "reply":{
    //                             "id":"adi3",
    //                             "title":"5 Mounds"
    //                         }
    //                     },
    //                     {
    //                         "type": "reply",
    //                         "reply":{
    //                             "id":"adi4",
    //                             "title":"M & M"
    //                         }
    //                     },
    //                     {
    //                         "type": "reply",
    //                         "reply":{
    //                             "id":"adi5",
    //                             "title":"Rice Krispies"
    //                         }
    //                     },
    //                     {
    //                         "type": "reply",
    //                         "reply":{
    //                             "id":"compra",
    //                             "title":"❌ terminar compra"
    //                         }
    //                     },
    //                 ]
    //             }
    //         }
    //     });
    // } else if (text.includes("adi3")) {
    //     userState[number].productos = [...userState[number].productos, "5 Mounds"]; // Agregar producto usando spread operator
    //     data = JSON.stringify({
    //         "messaging_product": "whatsapp",
    //         "recipient_type": "individual",
    //         "to": number,
    //         "type": "interactive",
    //         "interactive": {
    //             "type": "button",
    //             "header": {
    //                 "type": "image",
    //                 "image": {
    //                     "link": "https://res.cloudinary.com/dzty81hol/image/upload/v1739050130/acmaxpnxqdqfikhhhlhl.jpg",
    //                 }
    //             },
    //             "body": {
    //                 "text": "📌 Includes Oreo mini golden.\n\n🎁 A perfect detail for Valentine's Day. 💖\n\n💵 Price: $1.5",
    //             },
    //             "footer": {
    //                 "text": "¿Quieres comprar este producto?"
    //             },
    //             "action": {
    //                 "buttons": [
    //                     {
    //                         "type": "reply",
    //                         "reply": {
    //                             "id": "adquicompra",
    //                             "title": "🛒 agregar ahora"
    //                         }
    //                     },
    //                     {
    //                         "type": "reply",
    //                         "reply":{
    //                             "id":"adi1",
    //                             "title":"Mani Planters"
    //                         }
    //                     },
    //                     {
    //                         "type": "reply",
    //                         "reply":{
    //                             "id":"adi2",
    //                             "title":"Oreo mini"
    //                         }
    //                     },
    //                     {
    //                         "type": "reply",
    //                         "reply":{
    //                             "id":"adi4",
    //                             "title":"M & M"
    //                         }
    //                     },
    //                     {
    //                         "type": "reply",
    //                         "reply":{
    //                             "id":"adi5",
    //                             "title":"Rice Krispies"
    //                         }
    //                     },
    //                     {
    //                         "type": "reply",
    //                         "reply":{
    //                             "id":"compra",
    //                             "title":"❌ terminar compra"
    //                         }
    //                     },
    //                 ]
    //             }
    //         }
    //     });
    // } else if (text.includes("adi4")) {
    //     userState[number].productos = [...userState[number].productos, "M & M"]; // Agregar producto usando spread operator
    //     data = JSON.stringify({
    //         "messaging_product": "whatsapp",
    //         "recipient_type": "individual",
    //         "to": number,
    //         "type": "interactive",
    //         "interactive": {
    //             "type": "button",
    //             "header": {
    //                 "type": "image",
    //                 "image": {
    //                     "link": "https://res.cloudinary.com/dzty81hol/image/upload/v1739050130/cogifjvjeza3ufdutabh.jpg",
    //                 }
    //             },
    //             "body": {
    //                 "text": "📌 Includes Oreo mini golden.\n\n🎁 A perfect detail for Valentine's Day. 💖\n\n💵 Price: $1.5",
    //             },
    //             "footer": {
    //                 "text": "¿Quieres comprar este producto?"
    //             },
    //             "action": {
    //                 "buttons": [
    //                     {
    //                         "type": "reply",
    //                         "reply": {
    //                             "id": "adquicompra",
    //                             "title": "🛒 agregar ahora"
    //                         }
    //                     },
    //                     {
    //                         "type": "reply",
    //                         "reply":{
    //                             "id":"adi1",
    //                             "title":"Mani Planters"
    //                         }
    //                     },
    //                     {
    //                         "type": "reply",
    //                         "reply":{
    //                             "id":"adi2",
    //                             "title":"Oreo mini"
    //                         }
    //                     },
    //                     {
    //                         "type": "reply",
    //                         "reply":{
    //                             "id":"adi3",
    //                             "title":"5 Mounds"
    //                         }
    //                     },
    //                     {
    //                         "type": "reply",
    //                         "reply":{
    //                             "id":"adi5",
    //                             "title":"Rice Krispies"
    //                         }
    //                     },
    //                     {
    //                         "type": "reply",
    //                         "reply":{
    //                             "id":"compra",
    //                             "title":"❌ terminar compra"
    //                         }
    //                     },
    //                 ]
    //             }
    //         }
    //     });
    // } else if (text.includes("adi5")) {
    //     userState[number].productos = [...userState[number].productos, "Rice Krispies"]; // Agregar producto usando spread operator
    //     data = JSON.stringify({
    //         "messaging_product": "whatsapp",
    //         "recipient_type": "individual",
    //         "to": number,
    //         "type": "interactive",
    //         "interactive": {
    //             "type": "button",
    //             "header": {
    //                 "type": "image",
    //                 "image": {
    //                     "link": "https://res.cloudinary.com/dzty81hol/image/upload/v1739050130/cogifjvjeza3ufdutabh.jpg",
    //                 }
    //             },
    //             "body": {
    //                 "text": "📌 Includes Oreo mini golden.\n\n🎁 A perfect detail for Valentine's Day. 💖\n\n💵 Price: $1.5",
    //             },
    //             "footer": {
    //                 "text": "¿Quieres comprar este producto?"
    //             },
    //             "action": {
    //                 "buttons": [
    //                     {
    //                         "type": "reply",
    //                         "reply": {
    //                             "id": "adquicompra",
    //                             "title": "🛒 agregar ahora"
    //                         }
    //                     },
    //                     {
    //                         "type": "reply",
    //                         "reply":{
    //                             "id":"adi1",
    //                             "title":"Mani Planters"
    //                         }
    //                     },
    //                     {
    //                         "type": "reply",
    //                         "reply":{
    //                             "id":"adi2",
    //                             "title":"Oreo mini"
    //                         }
    //                     },
    //                     {
    //                         "type": "reply",
    //                         "reply":{
    //                             "id":"adi3",
    //                             "title":"5 Mounds"
    //                         }
    //                     },
    //                     {
    //                         "type": "reply",
    //                         "reply":{
    //                             "id":"adi4",
    //                             "title":"M & M"
    //                         }
    //                     },
    //                     {
    //                         "type": "reply",
    //                         "reply":{
    //                             "id":"compra",
    //                             "title":"❌ terminar compra"
    //                         }
    //                     },
    //                 ]
    //             }
    //         }
    //     });
    } else if (text.includes("compra")) {
        // Preguntar por la ciudad
        userState[number].step = "esperando_ciudad";
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "¡Genial! Para completar tu compra, ¿en qué domicilio donde te encuentras? 🌍"
            }
        });
    } else if (userState[number]?.step === "esperando_ciudad") {
        userState[number].ciudad = text;

        // Enviar correo con todos los productos comprados
        EnviarCorreoCompra(number, userState[number].productos, userState[number].name, userState[number].ciudad);

        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "Gracias por tu compra. 📦 Te contactaremos pronto para coordinar la entrega. 💖"
            }
        });

        // Resetear estado del usuario
        delete userState[number];
    }

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

// import { request } from "https";
// import { EnviarCorreoCompra } from "./mailService.js";

// const userState = {}; // Para almacenar el estado del usuario

// export function EnviarMensajeWhastapp  (text, number) {
    
//     text = text.toLowerCase();

//     if (!userState[number]) {
//         userState[number] = { stage: "ask_name" };
//     }

//     let data;

//     if (userState[number].stage === "ask_name") {
//         userState[number].stage = "greet";
//         data = JSON.stringify({
//             "messaging_product": "whatsapp",
//             "recipient_type": "individual",
//             "to": number,
//             "type": "text",
//             "text": {
//                 "preview_url": false,
//                 "body": "¡Hola! 😊 Antes de continuar, ¿puedes decirme tu nombre?"
//             }
//         });
//     } else if (userState[number].stage === "greet") {
//         userState[number].name = text;
//         userState[number].stage = "product_selection";
//         data = JSON.stringify({
//             "messaging_product": "whatsapp",
//             "to": number,
//             "type": "interactive",
//             "interactive": {
//                 "type": "button",
//                 "body": {
//                     "text": `👋 ¡Hola ${text}! Bienvenido. ¿Te gustaría conocer más sobre nuestros productos?`
//                 },
//                 "footer": {
//                     "text": "Selecciona una de las opciones"
//                 },
//                 "action": {
//                     "buttons": [
//                         {
//                             "type": "reply",
//                             "reply": {
//                                 "id": "btnsi",
//                                 "title": "Sí"
//                             }
//                         },
//                         {
//                             "type": "reply",
//                             "reply": {
//                                 "id": "btnno",
//                                 "title": "No"
//                             }
//                         }
//                     ]
//                 }
//             }
//         });

//     }else if(text.includes("gracias")) {
//         data = JSON.stringify({
            
//             "messaging_product": "whatsapp",
//             "recipient_type": "individual",
//             "to": number,
//             "type": "text",
//             "text": {
//                 "preview_url": false,
//                 "body": "Gracias a ti por contactarme. 🤩"
//             }
            
//         });

//     }else if(text.includes("adios") ||  text.includes("bye") || text.includes("nos vemos") ) {
//         data = JSON.stringify({
            
//             "messaging_product": "whatsapp",
//             "recipient_type": "individual",
//             "to": number,
//             "type": "text",
//             "text": {
//                 "preview_url": false,
//                 "body": "Hasta luego. 🌟"
//             }
            
//         });

//     }else if(text.includes("btnsi") ) {
//         data = JSON.stringify({
            
//             "messaging_product": "whatsapp",
//             "to": number,
//             "type": "interactive",
//             "interactive": {
//                 "type": "button",
//                 "body": {
//                     "text": "Select one of these options"
//                 },
//                 "footer": {
//                     "text": "Select one of these options"
//                 },
//                 "action" :{
//                     "buttons": [
//                         {
//                             "type": "reply",
//                             "reply":{
//                                 "id":"producto1",
//                                 "title":"Sweetheart 🧸 White"
//                             }
//                         },
//                         {
//                             "type": "reply",
//                             "reply":{
//                                 "id":"producto2",
//                                 "title":"Puppy Love 🧸"
//                             }
//                         },
//                         {
//                             "type": "reply",
//                             "reply":{
//                                 "id":"producto3",
//                                 "title":"Sweetheart 🧸 Brown"
//                             }
//                         }
//                     ]
//                 }
//             }
            
//         });
//     }else if(text.includes("btnno")){
//         data = JSON.stringify({
//             "messaging_product": "whatsapp",
//             "recipient_type": "individual",
//             "to": number,
//             "type": "text",
//             "text": {
//                 "preview_url": false,
//                 "body": "Entiendo, muchas gracias. "
//             }
//         });
//     }else if(text.includes("producto1")){
//         userState[number].lastProduct = "Sweetheart 🧸 White";  // ✅ Guardar el producto
//         data = JSON.stringify({
//             "messaging_product": "whatsapp",
//                 "recipient_type": "individual",
//                 "to": number,
//                 "type": "interactive",
//                 "interactive": {
//                     "type": "button",
//                     "header": {
//                         "type": "image",
//                         "image": {
//                             "link": "https://res.cloudinary.com/dzty81hol/image/upload/v1738879497/kwocjvsoayoz8wsdawz8.jpg",
//                         }
//                     },
//                     "body": {
//                         "text": "📌 Includes Sweetheart Teddy White - 12 Ferrero Rocher - 1 Heart Balloon - 1 Rice Krispies Treats 2.2 oz.\n\n🎁 A perfect detail for Valentine's Day. 💖\n\n💵 Price: $50",
//                     },
//                     "footer": {
//                         "text": "¿Quieres comprar este producto?"
//                     },
//                     "action": {
//                         "buttons": [
//                             {
//                                 "type": "reply",
//                                 "reply": {
//                                     "id": "compra",
//                                     "title": "🛒 adquirir ahora"
//                                 }
//                             },
//                             {
//                                 "type": "reply",
//                                 "reply":{
//                                     "id":"producto2",
//                                     "title":"Puppy Love 🧸"
//                                 }
//                             },
//                             {
//                                 "type": "reply",
//                                 "reply":{
//                                     "id":"producto3",
//                                     "title":"Sweetheart 🧸 Brown"
//                                 }
//                             }
//                         ]
//                     }
//                 }
//             });
//     }else if(text.includes("producto2")){
//         userState[number].lastProduct = "Puppy Love 🧸";  // ✅ Guardar el producto
//         data = JSON.stringify({
//             "messaging_product": "whatsapp",
//                 "recipient_type": "individual",
//                 "to": number,
//                 "type": "interactive",
//                 "interactive": {
//                     "type": "button",
//                     "header": {
//                         "type": "image",
//                         "image": {
//                             "link": "https://res.cloudinary.com/dzty81hol/image/upload/v1738879497/wlasox3w4jxlxgvjiycj.jpg",
//                         }
//                     },
//                     "body": {
//                         "text": "📌 Includes Pirouline - 2 Golden Oreos Vanilla 22g - 12 Ferrero Rocher - 1 Heart Balloon - 1 Business card.\n\n🎁 A perfect detail for Valentine's Day. 💖\n\n💵 Price: $40",
//                     },
//                     "footer": {
//                         "text": "¿Quieres comprar este producto?"
//                     },
//                     "action": {
//                         "buttons": [
//                             {
//                                 "type": "reply",
//                                 "reply": {
//                                     "id": "compra",
//                                     "title": "🛒 adquirir ahora"
//                                 }
//                             },
//                             {
//                                 "type": "reply",
//                                 "reply":{
//                                     "id":"producto1",
//                                     "title":"Sweetheart 🧸 White"
//                                 }
//                             },
//                             {
//                                 "type": "reply",
//                                 "reply":{
//                                     "id":"producto3",
//                                     "title":"Sweetheart 🧸 Brown"
//                                 }
//                             }
//                         ]
//                     }
//                 }
//             });
//     }else if(text.includes("producto3")){
//         userState[number].lastProduct = "Sweetheart 🧸 Brown";  // ✅ Guardar el producto
//         data = JSON.stringify({
//             "messaging_product": "whatsapp",
//                 "recipient_type": "individual",
//                 "to": number,
//                 "type": "interactive",
//                 "interactive": {
//                     "type": "button",
//                     "header": {
//                         "type": "image",
//                         "image": {
//                             "link": "https://res.cloudinary.com/dzty81hol/image/upload/v1738879699/nlsrnjdnxtzcbqnc4o27.jpg",
//                         }
//                     },
//                     "body": {
//                         "text": "📌 Includes Sweetheart Teddy Brown - 6 Ferrero Rocher - 1 Heart Balloon - 1 Business card.\n\n🎁 A perfect detail for Valentine's Day. 💖\n\n💵 Price: $50",
//                     },
//                     "footer": {
//                         "text": "¿Quieres comprar este producto?"
//                     },
//                     "action": {
//                         "buttons": [
//                             {
//                                 "type": "reply",
//                                 "reply": {
//                                     "id": "compra",
//                                     "title": "🛒 adquirir ahora"
//                                 }
//                             },
//                             {
//                                 "type": "reply",
//                                 "reply":{
//                                     "id":"producto1",
//                                     "title":"Sweetheart 🧸 White"
//                                 }
//                             },
//                             {
//                                 "type": "reply",
//                                 "reply":{
//                                     "id":"producto2",
//                                     "title":"Puppy Love 🧸"
//                                 }
//                             },
//                         ]
//                     }
//                 }
//             });
//     }else if (text.includes("compra")) {
//         let productoComprado = userState[number]?.lastProduct || "Producto desconocido";
//         let nombreComprador = userState[number]?.name || "No especificado";
    
//         // Preguntar por la ciudad
//         userState[number].step = "esperando_ciudad";
//         data = JSON.stringify({
//             "messaging_product": "whatsapp",
//             "recipient_type": "individual",
//             "to": number,
//             "type": "text",
//             "text": {
//                 "preview_url": false,
//                 "body": "¡Genial! Para completar tu compra, ¿en qué domicilio donde te encuentras? 🌍"
//             }
//         });
//     } else if (userState[number]?.step === "esperando_ciudad") {
//         userState[number].ciudad = text;

//         // Enviar correo con la compra, incluyendo nombre y ciudad
//         EnviarCorreoCompra(number, userState[number].lastProduct, userState[number].name, userState[number].ciudad);
    
//         data = JSON.stringify({
//             "messaging_product": "whatsapp",
//             "recipient_type": "individual",
//             "to": number,
//             "type": "text",
//             "text": {
//                 "preview_url": false,
//                 "body": "Gracias por tu compra. 📦 Te contactaremos pronto para coordinar la entrega. 💖"
//             }
//         });
//         // Resetear estado del usuario
//         delete userState[number]
//     }

//     const option = {
//         host : "graph.facebook.com",
//         path : "/v21.0/586933011161982/messages",
//         method : "POST",
//         body : data,
//         headers : {
//             "Content-Type" : "application/json",
//             Authorization :"Bearer EAAGXpgKoZBOgBO5bcgM4JAZBDTQZCyolZCDpBQVp2l9kLZC4cubvR2OOy4RGBGj98nJCEOcCFAFaz7IDEJcZA228IC8ewuAm0xbheos80Pe6KEJOnTLCrQJBLSJN7K1O7UlHjMBOrsFHsZCNrKAEbPYWuMtne0x2jgocspAto9QPLwoAR6oc1kvRZCQAZAKia8CfqQQZDZD"
//         }
//     };

//     const req = request(option,res => {
//         res.on("data",d=>{
//             process.stdout.write(d);
//         });
//     });

//     req.write(data);
//     req.end();
// };
