import nodemailer from "nodemailer";

// Diccionario de productos con imágenes
const productosInfo = {
    "Sweetheart 🧸 White": "https://res.cloudinary.com/dzty81hol/image/upload/v1738879497/kwocjvsoayoz8wsdawz8.jpg",
    "Puppy Love 🧸": "https://res.cloudinary.com/dzty81hol/image/upload/v1738879497/wlasox3w4jxlxgvjiycj.jpg",
    "Sweetheart 🧸 Brown": "https://res.cloudinary.com/dzty81hol/image/upload/v1738879699/nlsrnjdnxtzcbqnc4o27.jpg",
    "Mani Planters": "https://res.cloudinary.com/dzty81hol/image/upload/v1739050130/ibim3vm1n9dna7raqd62.jpg",
    // "Oreo mini": "https://res.cloudinary.com/dzty81hol/image/upload/v1739050130/vj6i48n2okzwqqrx6cqz.jpg",
    // "5 Mounds": "https://res.cloudinary.com/dzty81hol/image/upload/v1739050130/vj6i48n2okzwqqrx6cqz.jpg",
    // "M & M": "https://res.cloudinary.com/dzty81hol/image/upload/v1739050130/cogifjvjeza3ufdutabh.jpg",
    // "Rice Krispies": "https://res.cloudinary.com/dzty81hol/image/upload/v1739050130/cogifjvjeza3ufdutabh.jpg",
};

export async function EnviarCorreoCompra(number, productos, nombre, ciudad) {
    const fechaCompra = new Date().toLocaleString("es-ES", { timeZone: "America/Bogota" });

    // Asegurar que productos sea un array
    const productosArray = Array.isArray(productos) ? productos : [productos]
    
     // Construir el HTML de los productos
        const productosHTML = productosArray.map(producto => {
        const imagenProducto = productosInfo[producto] || "https://example.com/default-image.jpg"; // Imagen por defecto si no se encuentra
        return `
            <p><strong>🛒 Producto:</strong> ${producto}</p>
            <img src="${imagenProducto}" alt="${producto}" width="200">
            <hr>
        `;
    }).join(""); // Unir todos los productos en un solo string HTML

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "heynar76max@gmail.com",  // Reemplázalo con tu correo
            pass: "htgk dttq kfaw beha"         // Usa una contraseña de aplicación si es Gmail
        }
    });

    const mailOptions = {
        from: "heynar76max@gmail.com",
        to: "heynar76max@gmail.com",  // Donde recibirás la notificación
        subject: "Nueva Compra Recibida",
        html: `
            <meta charset="UTF-8">
            <h2>📌 Nueva compra recibida</h2>
            <p><strong>📅 Fecha:</strong> ${fechaCompra}</p>
            <p><strong>📞 Número de WhatsApp:</strong> ${number}</p>
            <p><strong>👤 Nombre:</strong> ${nombre || "No especificado"}</p>
            <p><strong>🌍 Dirección:</strong> ${ciudad || "No especificada"}</p>
            <h3>🛍 Productos comprados:</h3>
            ${productosHTML}
            <p>Revisa WhatsApp para coordinar la entrega. 🚚</p>
        `
    };
    
    try {
        await transporter.sendMail(mailOptions);
        console.log("📧 Correo de compra enviado correctamente.");
    } catch (error) {
        console.error("❌ Error al enviar el correo:", error);
    }
    
}
