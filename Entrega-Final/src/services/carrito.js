import db from '../persistence/carrito.js'


async function obtenerCarritoId(num) {
    return await db.listarPorId(num)
}

async function obtenerCarritoMail(mail) {
    return await db.listarPorMail(mail)
}

async function obtenercarrito() {
    let mailSession = await db.obtenerMailSession()
    let carrito = await obtenerCarritoMail(mailSession)
    return carrito
}

async function agregarCarrito(carritoInfo) {
    return await db.guardar(carritoInfo)
}

async function eliminarCarrito() {
    return await db.eliminarTodos()
}

async function eliminarCarritoPorId(num) {
    return await db.eliminarPorId(num)
}

async function modificarCarrito(num, obj) {
    return await db.modificar(num, obj)
}

export default {
    obtenercarrito,
    agregarCarrito,
    eliminarCarrito,
    eliminarCarritoPorId,
    modificarCarrito,
    obtenerCarritoId,
    obtenerCarritoMail
}