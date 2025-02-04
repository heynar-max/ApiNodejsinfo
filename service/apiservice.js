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
                "body": "🚀 ¡Hola! Bienvenido a nuestra tienda de San Valentín ❤️\n\n📌 Escribe el número del producto para ver la imagen, descripción y opciones de compra:\n\n1️⃣ Rosa con chocolates 🌹🍫\n2️⃣ Peluche con vino 🧸🍷\n3️⃣ Lapicero y diario ✏️📖"
            }
        });

    } else if (text == "1") {
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "interactive",
            "interactive": {
                "type": "button",
                "body": {
                    "text": "🌹 *Rosa con Chocolates* – $10\n\n📌 Incluye una rosa importada de Colombia y una caja de chocolates Ferrero Rocher.\n🎁 Un detalle perfecto para San Valentín. 💖"
                },
                "footer": {
                    "text": "¿Quieres comprar este producto?"
                },
                "header": {
                    "type": "image",
                    "image": {
                        "link": "https://ejemplo.com/rosa_chocolates.jpg" // 🔗 Reemplaza con tu URL
                    }
                },
                "action": {
                    "buttons": [
                        {
                            "type": "reply",
                            "reply": {
                                "id": "comprar_rosa",
                                "title": "🛒 Comprar ahora"
                            }
                        }
                    ]
                }
            }
        });

    } else if (text == "2") {
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "interactive",
            "interactive": {
                "type": "button",
                "body": {
                    "text": "🧸 *Peluche con Vino* – $20\n\n📌 Incluye un peluche de alta calidad y una botella de vino *Casillero del Diablo*.\n🎁 Perfecto para una velada romántica. 🍷💘"
                },
                "footer": {
                    "text": "¿Quieres comprar este producto?"
                },
                "header": {
                    "type": "image",
                    "image": {
                        "link": "https://ejemplo.com/peluche_vino.jpg" // 🔗 URL de la imagen
                    }
                },
                "action": {
                    "buttons": [
                        {
                            "type": "reply",
                            "reply": {
                                "id": "comprar_peluche",
                                "title": "🛒 Comprar ahora"
                            }
                        }
                    ]
                }
            }
        });

    } else if (text == "3") {
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "interactive",
            "interactive": {
                "type": "button",
                "body": {
                    "text": "✏️ *Lapicero y Diario* – $5\n\n📌 Incluye un elegante diario de cuero y un lapicero metálico.\n🎁 Ideal para quienes aman escribir. 📝✨"
                },
                "footer": {
                    "text": "¿Quieres comprar este producto?"
                },
                "header": {
                    "type": "image",
                    "image": {
                        "link": "https://ejemplo.com/lapicero_diario.jpg" // 🔗 URL real
                    }
                },
                "action": {
                    "buttons": [
                        {
                            "type": "reply",
                            "reply": {
                                "id": "comprar_lapicero",
                                "title": "🛒 Comprar ahora"
                            }
                        }
                    ]
                }
            }
        });

    } else if (text.includes("comprar_")) {
        let producto = "";
        if (text.includes("rosa")) producto = "🌹 Rosa con Chocolates";
        if (text.includes("peluche")) producto = "🧸 Peluche con Vino";
        if (text.includes("lapicero")) producto = "✏️ Lapicero y Diario";

        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": `✅ Has seleccionado *${producto}*.\n\n💳 Para completar tu compra, responde con:\n\n- *Efectivo* 💵\n- *Transferencia bancaria* 🏦\n- *Pago con tarjeta* 💳`
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
                "body": "🚀 No entendí tu mensaje. Escribe *hola* para ver las opciones de productos. 😊"
            }
        });
    }

    // if (text.includes("hola")) {
    //     data = JSON.stringify({
    //         "messaging_product": "whatsapp",
    //         "recipient_type": "individual",
    //         "to": number,
    //         "type": "text",
    //         "text": {
    //             "preview_url": false,
    //             "body": "🚀 ¡Hola! Bienvenido. ¿Quieres ver nuestros productos de San Valentín? ❤️\n\n📌 Escribe el número del producto para ver la imagen y su precio.\n\n1️⃣ Rosa con chocolates 🌹🍫\n2️⃣ Peluche con vino 🧸🍷\n3️⃣ Lapicero y diario ✏️📖"
    //         }
    //     });

    // } else if (text == "1") {
    //     data = JSON.stringify({
    //         "messaging_product": "whatsapp",
    //         "recipient_type": "individual",
    //         "to": number,
    //         "type": "image",
    //         "image": {
    //             "link": "https://i.pinimg.com/474x/a8/8e/44/a88e446d097458cf30f5bc675a331de7.jpg", // 🔗 Reemplaza con la URL real de la imagen
    //             "caption": "🌹 Rosa con chocolates – $10\n\nUn hermoso detalle para sorprender a tu persona especial. 💖"
    //         }
    //     });

    // } else if (text == "2") {
    //     data = JSON.stringify({
    //         "messaging_product": "whatsapp",
    //         "recipient_type": "individual",
    //         "to": number,
    //         "type": "image",
    //         "image": {
    //             "link": "https://i.pinimg.com/236x/9f/52/01/9f52012882384f7e8d50c43dcb773084.jpg", // 🔗 URL de la imagen real
    //             "caption": "🧸 Peluche con vino – $20\n\nUn regalo romántico y especial para esta fecha. 🍷💘"
    //         }
    //     });

    // } else if (text == "3") {
    //     data = JSON.stringify({
    //         "messaging_product": "whatsapp",
    //         "recipient_type": "individual",
    //         "to": number,
    //         "type": "image",
    //         "image": {
    //             "link": "https://i.pinimg.com/474x/d9/f7/d4/d9f7d4a546537df69ba0d5ded381ea49.jpg", // 🔗 URL real
    //             "caption": "✏️ Lapicero y diario – $5\n\nUn detalle sencillo pero significativo para esa persona especial. 💕"
    //         }
    //     });

    // } else {
    //     data = JSON.stringify({
    //         "messaging_product": "whatsapp",
    //         "recipient_type": "individual",
    //         "to": number,
    //         "type": "text",
    //         "text": {
    //             "preview_url": false,
    //             "body": "🚀 No entendí tu mensaje. Escribe *hola* para ver las opciones de productos. 😊"
    //         }
    //     });
    // }

    // if (text.includes("hola")) {
    //     data = JSON.stringify({
    //         "messaging_product": "whatsapp",
    //         "recipient_type": "individual",
    //         "to": number,
    //         "type": "text",
    //         "text": {
    //             "preview_url": false,
    //             "body": "🚀 Hola, bienvenido. ¿Te gustaría ver nuestros productos de San Valentín? ❤️ Responde con *sí* o *no*."
    //         }
    //     });
    // } else if (text.includes("sí")) {
    //     data = JSON.stringify({
    //         "messaging_product": "whatsapp",
    //         "to": number,
    //         "type": "interactive",
    //         "interactive": {
    //             "type": "list",
    //             "body": {
    //                 "text": "Estos son nuestros productos especiales de San Valentín. Elige uno para más detalles."
    //             },
    //             "footer": {
    //                 "text": "Selecciona un producto para más información"
    //             },
    //             "action": {
    //                 "button": "Ver productos",
    //                 "sections": [
    //                     {
    //                         "title": "Regalos de San Valentín",
    //                         "rows": [
    //                             {
    //                                 "id": "sanvalentin_1",
    //                                 "title": "🌹 Rosa con chocolates - $10",
    //                                 "description": "Un detalle romántico con una rosa y chocolates Ferrero."
    //                             },
    //                             {
    //                                 "id": "sanvalentin_2",
    //                                 "title": "🧸 Peluche con vino - $20",
    //                                 "description": "Un tierno peluche acompañado de una botella de vino."
    //                             },
    //                             {
    //                                 "id": "sanvalentin_3",
    //                                 "title": "📔 Lapicero y diario - $5",
    //                                 "description": "Un elegante diario con un lapicero de calidad."
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             }
    //         }
    //     });
    // } else if (text.includes("sanvalentin_1")) {
    //     data = JSON.stringify({
    //         "messaging_product": "whatsapp",
    //         "recipient_type": "individual",
    //         "to": number,
    //         "type": "text",
    //         "text": {
    //             "preview_url": false,
    //             "body": "🌹 **Rosa con chocolates** - $10\n💖 Incluye:\n- 1 rosa importada\n- Chocolates Ferrero Rocher\n- Presentación elegante\n¿Te gustaría comprarlo? Responde con *comprar 1*."
    //         }
    //     });
    // } else if (text.includes("sanvalentin_2")) {
    //     data = JSON.stringify({
    //         "messaging_product": "whatsapp",
    //         "recipient_type": "individual",
    //         "to": number,
    //         "type": "text",
    //         "text": {
    //             "preview_url": false,
    //             "body": "🧸 **Peluche con vino** - $20\n🍷 Incluye:\n- Peluche de 25 cm\n- Botella de vino tinto (750ml)\n- Presentación en caja de regalo\n¿Te gustaría comprarlo? Responde con *comprar 2*."
    //         }
    //     });
    // } else if (text.includes("sanvalentin_3")) {
    //     data = JSON.stringify({
    //         "messaging_product": "whatsapp",
    //         "recipient_type": "individual",
    //         "to": number,
    //         "type": "text",
    //         "text": {
    //             "preview_url": false,
    //             "body": "📔 **Lapicero y diario** - $5\n✍️ Incluye:\n- Lapicero tinta gel Parker\n- Diario de cuero sintético\n- Presentación en estuche\n¿Te gustaría comprarlo? Responde con *comprar 3*."
    //         }
    //     });
    // } else if (text.includes("comprar")) {
    //     let producto = text.split(" ")[1];
    //     let mensaje = "¡Gracias por tu compra! ";

    //     if (producto == "1") mensaje += "Te contactaremos para entregarte tu Rosa con chocolates. 🌹🍫";
    //     else if (producto == "2") mensaje += "Te contactaremos para entregarte tu Peluche con vino. 🧸🍷";
    //     else if (producto == "3") mensaje += "Te contactaremos para entregarte tu Lapicero y diario. 📔✍️";
    //     else mensaje = "No reconocemos tu opción, intenta de nuevo.";

    //     data = JSON.stringify({
    //         "messaging_product": "whatsapp",
    //         "recipient_type": "individual",
    //         "to": number,
    //         "type": "text",
    //         "text": {
    //             "preview_url": false,
    //             "body": mensaje
    //         }
    //     });
    // } else {
    //     data = JSON.stringify({
    //         "messaging_product": "whatsapp",
    //         "recipient_type": "individual",
    //         "to": number,
    //         "type": "text",
    //         "text": {
    //             "preview_url": false,
    //             "body": "🚀 Hola, visita mi web https://portafoliu.vercel.app para más información. Escribe *boton* o *lista* para más opciones.\n\n📌 Por favor, ingresa un número para recibir información.\n\n1️⃣. Información del bot. ❔\n2️⃣. Ubicación del local. 📍\n3️⃣. Enviar temario en PDF. 📄\n4️⃣. Audio explicando bot. 🎧\n5️⃣. Video de introducción. ⏯️\n6️⃣. Hablar con Heynar. 🙋‍♂️\n7️⃣. Horario de atención. 🕜"
    //         }
    //     });
    // }

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
