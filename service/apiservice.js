import { request } from "https";

const clientes = {}; // Almacena los datos temporales de los clientes

export function EnviarMensajeWhastapp(text, number) {
    text = text.toLowerCase();

    let data;

    if(text.includes("hola")){
        data = JSON.stringify({
            
            "messaging_product": "whatsapp",    
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "👋 ¡Hola! Bienvenido a nuestra tienda de San Valentín ❤️\n\nPor favor, dime tu *nombre* para continuar. BOTON"
            }
            
        });
    }else if(text.includes("boton") ) {
        data = JSON.stringify({
            
            "messaging_product": "whatsapp",
            "to": number,
            "type": "interactive",
            "interactive": {
                "type": "button",
                "body": {
                    "text": "Selecciona un producto:"
                },
                
                "action" :{
                    "buttons": [
                        {
                            "type": "reply",
                            "reply":{
                                "id":"producto_1",
                                "title":"🌹 Rosa con chocolates"
                            }
                        },
                        {
                            "type": "reply",
                            "reply":{
                                "id":"producto_2",
                                "title":"🧸 Peluche con vino"
                            }
                        },
                        {
                            "type": "reply",
                            "reply":{
                                "id":"producto_3",
                                "title":"✏️ Lapicero y diario"
                            }
                        }
                    ]
                }
            }
            
        });
    }else if(text.includes("producto_1") ) {
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
                        "link": "https://i.pinimg.com/474x/a8/8e/44/a88e446d097458cf30f5bc675a331de7.jpg",
                    }
                },
                "body": {
                    "text": "📌 Incluye una rosa importada de Colombia y una caja de chocolates Ferrero Rocher.\n\n🎁 Un detalle perfecto para San Valentín. 💖",
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
                                "title": "🛒 adquirir ahora"
                            }
                        }
                    ]
                }
            }
        });
    }else if(text.includes("producto_2") ) {
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
                        "link": "https://i.pinimg.com/236x/9f/52/01/9f52012882384f7e8d50c43dcb773084.jpg",
                    }
                },
                "body": {
                    "text": "📌 Incluye un peluche de alta calidad y una botella de vino *Casillero del Diablo*.\n\n🎁 Perfecto para una velada romántica. 🍷💘",
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
                                "title": "🛒 adquirir ahora"
                            }
                        }
                    ]
                }
            }
        });
    }else if(text.includes("producto_3") ) {
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
                        "link": "https://i.pinimg.com/474x/d9/f7/d4/d9f7d4a546537df69ba0d5ded381ea49.jpg",
                    }
                },
                "body": {
                    "text": "📌 Incluye un elegante diario de cuero y un lapicero metálico.\n\n🎁 Ideal para quienes aman escribir. 📝✨",
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
                                "title": "🛒 adquirir ahora"
                            }
                        }
                    ]
                }
            }
        });
    }else{
        data = JSON.stringify({
            
            "messaging_product": "whatsapp",    
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "🚀 Hola, visita mi web https://portafoliu.vercel.app para mas información. Escribe *boton* o *lista* para mas opciones. \n \n📌Por favor, ingresa un numero #️⃣ para recibir información.\n \n1️⃣. Información del bot. ❔\n2️⃣. Ubicación del local. 📍\n3️⃣. Enviar temario en pdf. 📄\n4️⃣. Audio explicando bot. 🎧\n5️⃣. Video de Introducción. ⏯️\n6️⃣. Hablar con Heynar. 🙋‍♂️\n7️⃣. Horario de Atención. 🕜"
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



// 
// // import { request } from "https";

// const clientes = {}; // Almacena los datos temporales de los clientes

// export function EnviarMensajeWhastapp(text, number) {
//     text = text.toLowerCase();

//     if (!clientes[number]) {
//         clientes[number] = { step: "name", historial: [] }; // Se inicializa con historial vacío
//         sendMessage(number, "👋 ¡Hola! Bienvenido a nuestra tienda de San Valentín ❤️\n\nPor favor, dime tu *nombre* para continuar.");
//         return;
//     }

//     // Palabra clave para retroceder un paso
//     const palabrasVolver = ["atrás", "volver"];
//     if (palabrasVolver.includes(text)) {
//         retrocederPaso(number);
//         return;
//     }

//     switch (clientes[number].step) {
//         case "name":
//             clientes[number].historial.push("name"); // Guardamos el paso actual
//             clientes[number].name = text;
//             clientes[number].step = "done";
//             sendMessage(number, `✨ ¡Gracias, ${text}! Ahora puedes ver nuestros productos.\n\n📌 Escribe el número del producto para ver más detalles:\n\n1️⃣ Rosa con chocolates 🌹🍫\n2️⃣ Peluche con vino 🧸🍷\n3️⃣ Lapicero y diario ✏️📖`);
//             break;

//         case "email":
//             clientes[number].historial.push("email");
//             clientes[number].email = text;
//             clientes[number].step = "payment";
//             sendMessage(number, `📧 ¡Gracias! Tu correo es *${text}*.\n\n💳 Ahora, selecciona tu método de pago:\n\n- *Efectivo* 💵\n- *Transferencia bancaria* 🏦\n- *Pago con tarjeta* 💳`);
//             break;

//         default:
//             const productos = {
//                 "1": {
//                     "title": "🌹 Rosa con Chocolates",
//                     "price": "$10",
//                     "description": "📌 Incluye una rosa importada de Colombia y una caja de chocolates Ferrero Rocher.\n\n🎁 Un detalle perfecto para San Valentín. 💖",
//                     "image": "https://i.pinimg.com/474x/a8/8e/44/a88e446d097458cf30f5bc675a331de7.jpg",
//                     "id": "comprar_rosa"
//                 },
//                 "2": {
//                     "title": "🧸 Peluche con Vino",
//                     "price": "$20",
//                     "description": "📌 Incluye un peluche de alta calidad y una botella de vino *Casillero del Diablo*.\n\n🎁 Perfecto para una velada romántica. 🍷💘",
//                     "image": "https://i.pinimg.com/236x/9f/52/01/9f52012882384f7e8d50c43dcb773084.jpg",
//                     "id": "comprar_peluche"
//                 },
//                 "3": {
//                     "title": "✏️ Lapicero y Diario",
//                     "price": "$5",
//                     "description": "📌 Incluye un elegante diario de cuero y un lapicero metálico.\n\n🎁 Ideal para quienes aman escribir. 📝✨",
//                     "image": "https://i.pinimg.com/474x/d9/f7/d4/d9f7d4a546537df69ba0d5ded381ea49.jpg",
//                     "id": "comprar_lapicero"
//                 }
//             };

//             if (text === "1" || text === "2" || text === "3") {
//                 let product = productos[text];

//                 clientes[number].historial.push("done"); // Guardamos el paso antes de mostrar el producto

//                 const data = JSON.stringify({
//                     "messaging_product": "whatsapp",
//                     "recipient_type": "individual",
//                     "to": number,
//                     "type": "interactive",
//                     "interactive": {
//                         "type": "button",
//                         "header": {
//                             "type": "image",
//                             "image": {
//                                 "link": product.image
//                             }
//                         },
//                         "body": {
//                             "text": `${product.title} – ${product.price}\n\n${product.description}`
//                         },
//                         "footer": {
//                             "text": "¿Quieres comprar este producto?"
//                         },
//                         "action": {
//                             "buttons": [
//                                 {
//                                     "type": "reply",
//                                     "reply": {
//                                         "id": product.id,
//                                         "title": "🛒 Comprar ahora"
//                                     }
//                                 }
//                             ]
//                         }
//                     }
//                 });

//                 sendRequest(data);
//                 break;
//             }

//             if (text.includes("comprar_")) {
//                 let producto = text.includes("rosa") ? "🌹 Rosa con Chocolates" :
//                               text.includes("peluche") ? "🧸 Peluche con Vino" :
//                               "✏️ Lapicero y Diario";

//                 clientes[number].historial.push("done");
//                 clientes[number].step = "email"; // Ahora solicita el email
//                 sendMessage(number, `✅ *${clientes[number].name}*, has seleccionado *${producto}*.\n\nAntes de continuar con el pago, por favor ingresa tu *correo electrónico*.`);
//                 break;
//             }

//             sendMessage(number, `🚀 No entendí tu mensaje, *${clientes[number].name}*. Escribe *hola* para ver las opciones de productos. 😊`);
//             break;
//     }
// }

// // Función para retroceder un paso
// function retrocederPaso(number) {
//     if (!clientes[number] || clientes[number].historial.length === 0) {
//         sendMessage(number, "⚠️ No puedes retroceder más. Estás en el inicio.");
//         return;
//     }

//     const pasoAnterior = clientes[number].historial.pop(); // Obtener el último paso del historial
//     clientes[number].step = pasoAnterior; // Retroceder al paso anterior

//     switch (pasoAnterior) {
//         case "name":
//             sendMessage(number, "👋 Por favor, dime tu *nombre* para continuar.");
//             break;

//         case "done":
//             sendMessage(number, `✨ ¡Gracias, ${clientes[number].name}! Ahora puedes ver nuestros productos.\n\n📌 Escribe el número del producto para ver más detalles:\n\n1️⃣ Rosa con chocolates 🌹🍫\n2️⃣ Peluche con vino 🧸🍷\n3️⃣ Lapicero y diario ✏️📖`);
//             break;

//         case "email":
//             sendMessage(number, `✅ *${clientes[number].name}*, antes de continuar con el pago, por favor ingresa tu *correo electrónico*.`);
//             break;

//         default:
//             sendMessage(number, "⚠️ No hay un paso anterior válido.");
//             break;
//     }
// }

// function sendMessage(number, message) {
//     const data = JSON.stringify({
//         "messaging_product": "whatsapp",
//         "recipient_type": "individual",
//         "to": number,
//         "type": "text",
//         "text": {
//             "preview_url": false,
//             "body": message
//         }
//     });

//     sendRequest(data);
// }

// function sendRequest(data) {
//     const option = {
//         host: "graph.facebook.com",
//         path: "/v21.0/586933011161982/messages",
//         method: "POST",
//         body: data,
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer EAAGXpgKoZBOgBO5bcgM4JAZBDTQZCyolZCDpBQVp2l9kLZC4cubvR2OOy4RGBGj98nJCEOcCFAFaz7IDEJcZA228IC8ewuAm0xbheos80Pe6KEJOnTLCrQJBLSJN7K1O7UlHjMBOrsFHsZCNrKAEbPYWuMtne0x2jgocspAto9QPLwoAR6oc1kvRZCQAZAKia8CfqQQZDZD"
//         }
//     };

//     const req = request(option, res => {
//         res.on("data", d => {
//             process.stdout.write(d);
//         });
//     });

//     req.write(data);
//     req.end();
// }