import nodemailer from "nodemailer";

// Diccionario de productos con imágenes
const productosInfo = {
    "Sweetheart 🧸 White": "https://res.cloudinary.com/dzty81hol/image/upload/v1738879497/kwocjvsoayoz8wsdawz8.jpg",
    "Puppy Love 🧸": "https://res.cloudinary.com/dzty81hol/image/upload/v1738879497/wlasox3w4jxlxgvjiycj.jpg",
    "Sweetheart 🧸 Brown": "https://res.cloudinary.com/dzty81hol/image/upload/v1738879699/nlsrnjdnxtzcbqnc4o27.jpg"
};

export async function EnviarCorreoCompra(number, producto) {
    const fechaCompra = new Date().toLocaleString("es-ES", { timeZone: "America/Bogota" });
    const imagenProducto = productosInfo[producto] || "https://example.com/default-image.jpg"; // Imagen por defecto si no encuentra el producto

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "heynar76max@gmail.com",  // Reemplázalo con tu correo
            pass: "htgk dttq kfaw beha"         // Usa una contraseña de aplicación si es Gmail
        }
    });
    console.log("Producto recibido:", producto);
    console.log("Imagen del producto:", imagenProducto);
    const mailOptions = {
        from: "heynar76max@gmail.com",
        to: "heynar76max@gmail.com",  // Donde recibirás la notificación
        subject: "Nueva Compra Recibida",
        html: `
            <meta charset="UTF-8">
            <h2>📌 Nueva compra recibida</h2>
            <p><strong>📅 Fecha:</strong> ${fechaCompra}</p>
            <p><strong>📞 Número de WhatsApp:</strong> ${number}</p>
            <p><strong>🛒 Producto:</strong> ${producto}</p>
            <img src="${imagenProducto}" alt="Producto comprado" width="200">
            <p>Revisa WhatsApp para coordinar la entrega. 🚚</p>
        `
    };
    console.log("Producto recibido:", producto);
    console.log("Imagen del producto:", imagenProducto);
    try {
        await transporter.sendMail(mailOptions);
        console.log("📧 Correo de compra enviado correctamente.");
    } catch (error) {
        console.error("❌ Error al enviar el correo:", error);
    }
    console.log("Producto recibido:", producto);
console.log("Imagen del producto:", imagenProducto);
}
console.log("Producto recibido:", producto);
console.log("Imagen del producto:", imagenProducto);