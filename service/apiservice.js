import { request } from "https";

export function EnviarMensajeWhastapp  (text, number) {
    
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
                "body": "🚀 Hola Bienvenido "
            }
            
        });
    }else if(text == 1) {
        data = JSON.stringify({
            
            "messaging_product": "whatsapp",    
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }
            
        });

    }else if(text == 2) {
        data = JSON.stringify({
            
            "messaging_product": "whatsapp",
            "to": number,
            "type": "location",
            "location": {
                "latitude": "3.429954100205143",
                "longitude": "-76.54103829003456",
                "name": "Pascual Guerrero",
                "address": "san fernado cali"
            }
            
        });

    }else if(text == 3) {
        data = JSON.stringify({
            
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "document",
            "document": {
                "link": "https://www.turnerlibros.com/wp-content/uploads/2021/02/ejemplo.pdf",
                "caption": "Documento"
            }
            
        });

    }else if(text == 4) {
        data = JSON.stringify({
            
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "audio",
            "audio": {
                "link": "https://filesamples.com/samples/audio/mp3/sample1.mp3",
            }
            
        });

    }else if(text == 5) {
        data = JSON.stringify({
            
            "messaging_product": "whatsapp",
            "to": number,
            "text": {
                "preview_url": true,
                "body": "Please visit https://www.youtube.com/watch?v=7M56JNzPH54&t=131s&ab_channel=HeynarSotoHolguin"
            }
            
        });

    }else if(text == 6) {
        data = JSON.stringify({
            
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "🤝 En breve me pondre en contacto contigo. 🤓"
            }
            
        });

    }else if(text == 7) {
        data = JSON.stringify({
            
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "📅 Horario de Atención : Lunes a Viernes. \n🕜 Horario : 9:00 am a 5:00 pm 🤓"
            }
            
        });

    }else if(text.includes("gracias")) {
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

    }else if(text.includes("boton") ) {
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
                        {
                            "type": "reply",
                            "reply":{
                                "id":"btntalvez",
                                "title":"Tal vez"
                            }
                        }
                    ]
                }
            }
            
        });
    }else if(text.includes("btnsi")){
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "Excelente muchas gracias por registrarse. 🤩"
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
    }else if(text.includes("btntalvez")){
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "Espero se anime. "
            }
        });

    }else if(text.includes("lista")){
        data = JSON.stringify({
            "messaging_product": "whatsapp",
            "to": number,
            "type": "interactive",
            "interactive": {
                "type":"list",
                "body":{
                    "text":"Selecciona alguna opcion"
                },
                "footer":{
                    "text":"Selecciona una de las opciones para poder ayudarte"
                },
                "action":{
                    "button":"Ver opciones",
                    "sections":[
                        {
                            "title":"Compra y Venta",
                            "rows":[
                                {
                                    "id":"btncomprar",
                                    "title":"Comprar",
                                    "description":"Compra los mejores articulos de tecnologia"
                                },
                                {
                                    "id":"btnvender",
                                    "title":"Vender",
                                    "description":"Vende lo que ya no estes usando"
                                }
                            ]
                        },
                        {
                            "title":"Distribución y Recojo",
                            "rows":[
                                {
                                    "id":"btndireccion",
                                    "title":"Local",
                                    "description":"Puedes visitar nuestro local."
                                },
                                {
                                    "id":"btndistribucion",
                                    "title":"Distribución",
                                    "description":"La distribución se realiza todos los dias."
                                }
                            ]
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
        path : "/v21.0/591402320714042/messages",
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
