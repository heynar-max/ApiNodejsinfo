import { request } from "https";

// Objeto para almacenar el estado de la conversación por número de teléfono
const conversationState = {};

export function EnviarMensajeWhastapp(text, number) {
    text = text.toLowerCase();

    let data;

    // Verificar si el cliente ya ha proporcionado su nombre
    if (!conversationState[number]?.name) {
        if (text.includes("hola")) {
            data = JSON.stringify({
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": number,
                "type": "text",
                "text": {
                    "preview_url": false,
                    "body": "¡Hola! 👋 ¿Cómo te llamas?"
                }
            });

            // Guardar el estado de la conversación
            conversationState[number] = { waitingForName: true };
        } else if (conversationState[number]?.waitingForName) {
            // Almacenar el nombre proporcionado por el cliente
            conversationState[number].name = text;
            conversationState[number].waitingForName = false;

            data = JSON.stringify({
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": number,
                "type": "text",
                "text": {
                    "preview_url": false,
                    "body": `¡Mucho gusto, ${text}! 😊`
                }
            });

            // Después de saludar, mostrar las opciones de productos
            data = JSON.stringify({
                "messaging_product": "whatsapp",
                "to": number,
                "type": "interactive",
                "interactive": {
                    "type": "button",
                    "body": {
                        "text": "👋 ¡Hola! Bienvenido. ¿Te gustaría conocer más sobre nuestros productos?"
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
        }
    } else {
        // Continuar con la lógica existente si el nombre ya fue proporcionado
        if (text.includes("gracias")) {
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
                                    "id": "compra",
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
                                    "id": "compra",
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
                                    "id": "compra",
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
        } else if (text.includes("btncomprar")) {
            data = JSON.stringify({
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": number,
                "type": "text",
                "text": {
                    "preview_url": false,
                    "body": "Gracias por comprar."
                }
            });
        } else {
            data = JSON.stringify({
                "messaging_product": "whatsapp",
                "to": number,
                "type": "interactive",
                "interactive": {
                    "type": "button",
                    "body": {
                        "text": "👋 ¡Hola! Bienvenido. ¿Te gustaría conocer más sobre nuestros productos?"
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
                            },
                        ]
                    }
                }
            });
        }
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

// export function EnviarMensajeWhastapp  (text, number) {
    
//     text = text.toLowerCase();

//     let data;
//     if(text.includes("gracias")) {
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
//     }else if(text.includes("btncomprar")){
//         data = JSON.stringify({
//             "messaging_product": "whatsapp",
//             "recipient_type": "individual",
//             "to": number,
//             "type": "text",
//             "text": {
//                 "preview_url": false,
//                 "body": "gracias por comprar. "
//             }
//         });


//     }else{
//         data = JSON.stringify({
            
//             "messaging_product": "whatsapp",
//             "to": number,
//             "type": "interactive",
//             "interactive": {
//                 "type": "button",
//                 "body": {
//                     "text": "👋 Hello! Welcome! Would you like to know more about our products?"
//                 },
//                 "footer": {
//                     "text": "Select one of the options"
//                 },
//                 "action" :{
//                     "buttons": [
//                         {
//                             "type": "reply",
//                             "reply":{
//                                 "id":"btnsi",
//                                 "title":"Yes"
//                             }
//                         },
//                         {
//                             "type": "reply",
//                             "reply":{
//                                 "id":"btnno",
//                                 "title":"No"
//                             }
//                         },
//                     ]
//                 }
//             }
            
//         });
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
