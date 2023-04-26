import db from '../persistence/chat.js'

async function obtenerMensajes(mail) {
    if (!mail) {
        let mensajes = await db.listarTodas()
        return mensajes
    } else {
        let mensajes = await db.getByMail(mail)
        return mensajes
    }
}

async function sumarMensaje(msjInfo) {
    return await db.guardar(msjInfo)
}

export default {
    obtenerMensajes,
    sumarMensaje
}