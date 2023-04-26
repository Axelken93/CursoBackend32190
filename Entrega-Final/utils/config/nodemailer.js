import nodemailer from 'nodemailer';
import env from './inputs.js'

const mailGmail = env.MailNodemailer

const transporter = nodemailer.createTransport({
  host:"smtp.gmail.com",
  port: 587,
  auth: {
    user: mailGmail,
    pass: env.PassNodemailer
  }
})

// Desarrollo una funcion auxiliar para crear tabla de productos a enviar en el correo.
function crearTablaProductos(data) {
    let contenido = `<div class="table-responsive">
    <table class="table table-light">
        <tr style="color: blue;"> <th>Nombre</th> <th>Precio</th> <th>Cantidad</th></tr>`
    
    for (let e of data) {
        contenido += `    <tr>
        <td>${e.nombre}</td>
        <td>${e.precio}</td>
        <td>${e.cantidad}</td>
    </tr>`
    }
    contenido += `</table>
    </div>`
    return contenido
}

//----//

async function sendMailRegister(titulo, mensaje) {
    try {
        let variable = mensaje

        let contenido =`<p>Se ha creado un nuevo usuario:</p><br>
        <p><b>Nombre:</b> ${variable.nombre}</p>
        <p><b>Dirección:</b> ${variable.direccion}</p>
        <p><b>Telefono:</b> ${variable.telefono}</p>
        <p><b>Email:</b> ${variable.username}</p>`

        const mailOptions = {
        from: 'My Servidor Node.js',
        to: [mailGmail],
        subject: titulo,
        html: contenido,
        }

        await transporter.sendMail(mailOptions)
        console.log("Correo enviado con exito")
    } catch(error) {
        console.log({ERROR: 'Hubo un error al enviar el correo electronico por nuevo registro'})
    }
}

//----//

async function sendMailPurchase(asunto, mensaje) {
    try {
        let variable = mensaje

        let contenido = `<p>Compra finalizada con Éxito:</p><br>
        <p><b>Nro Orden:</b> ${variable.nroOrden}</p>
        <p><b>Fecha:</b> ${variable.fecha}</p>
        <p><b>Dirección:</b> ${variable.direccion}</p>
        <p><b>Items:</b></p>`

        contenido += crearTablaProductos(variable.items)

        const mailOptions = {
        from: 'My Servidor Node.js',
        to: [mailGmail, variable.mail],
        subject: asunto,
        html: contenido,
        }

        await transporter.sendMail(mailOptions)
        console.log("Correo enviado con exito")
    } catch(error) {
        console.log({Mensaje: 'Hubo un error al enviar el correo electronico por nuevo registro', ERROR: error})
    }   
}

export {sendMailRegister, sendMailPurchase};