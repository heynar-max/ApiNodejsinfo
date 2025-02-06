import { request } from "https";

export function EnviarMensajeWhastapp  (text, number) {
    
    text = text.toLowerCase();

    let data;
    if(text.includes("gracias")) {
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

    }else if(text.includes("adios") ||  text.includes("bye") || text.includes("nos vemos") ) {
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

    }else if(text.includes("btnsi") ) {
        data = JSON.stringify({
            
            "messaging_product": "whatsapp",
            "to": number,
            "type": "interactive",
            "interactive": {
                "type": "button",
                "body": {
                    "text": "¿Confirmas tu registro?"
                },
                "footer": {
                    "text": "Selecciona una de las opciones"
                },
                "action" :{
                    "buttons": [
                        {
                            "type": "reply",
                            "reply":{
                                "id":"rosachoco",
                                "title":"Rosa con chocolat 🌹"
                            }
                        },
                        {
                            "type": "reply",
                            "reply":{
                                "id":"peluvino",
                                "title":"Peluche con vino 🧸🍷"
                            }
                        },
                        {
                            "type": "reply",
                            "reply":{
                                "id":"lapidia",
                                "title":"Lapiz y diario ✏️📖"
                            }
                        }
                    ]
                }
            }
            
        });
    }else if(text.includes("btnno")){
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "Entiendo, muchas gracias. "
            }
        });
    }else if(text.includes("rosachoco")){
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
                        "text": "📌 Incluye una rosa importada de Colombia y una caja de chocolates Ferrero Rocher.\n\n🎁 Un detalle perfecto para San Valentín. 💖\n\n💵 Precio: $10",
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
                            }
                        ]
                    }
                }
            });
    }else if(text.includes("peluvino")){
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
                        "text": "📌 Incluye un peluche de alta calidad y una botella de vino *Casillero del Diablo*.\n\n🎁 Perfecto para una velada romántica. 🍷💘\n\n💵 Precio: $10",
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
                            }
                        ]
                    }
                }
            });
    }else if(text.includes("lapidia")){
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
                        "text": "📌 Incluye un elegante diario de cuero y un lapicero metálico.\n\n🎁 Ideal para quienes aman escribir. 📝✨\n\n💵 Precio: $10",
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
                            }
                        ]
                    }
                }
            });
    }else if(text.includes("btncomprar")){
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "gracias por comprar. "
            }
        });


    }else{
        data = JSON.stringify({
            
            "messaging_product": "whatsapp",
            "to": number,
            "type": "interactive",
            "interactive": {
                "type": "button",
                "body": {
                    "text": "👋 ¡Hola! Bienvenido Quieres conocer muestros productos?"
                },
                "footer": {
                    "text": "Selecciona una de las opciones"
                },
                "action" :{
                    "buttons": [
                        {
                            "type": "reply",
                            "reply":{
                                "id":"btnsi",
                                "title":"Si"
                            }
                        },
                        {
                            "type": "reply",
                            "reply":{
                                "id":"btnno",
                                "title":"No"
                            }
                        },
                    ]
                }
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
