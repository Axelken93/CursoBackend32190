import db from '../persistence/message.js'

async function obtenerMensaje() {
    let msj = await db.listarTodas()
    return msj
}

async function sumarMensaje(msjInfo) {
    await db.guardar(msjInfo)
}

export default {
    obtenerMensaje,
    sumarMensaje
}