import CarritoRepo from './repos/carrito.js'

const carritoRepo = new CarritoRepo()

async function listarTodas() {
    return await carritoRepo.getAll()
}

async function listarPorId(num) {
    let obtenido = await carritoRepo.getById(num)
    return obtenido
}

async function listarPorMail(mail) {
    let obtenido = await carritoRepo.getByMail(mail)
    return obtenido
}

async function guardar(obj) {
    return await carritoRepo.save(obj)
}

async function eliminarTodos() {
    return await carritoRepo.deleteAll()
}

async function eliminarPorId(num) {
    return await carritoRepo.deleteById(num)
}

async function modificar(num, obj) {
    return await carritoRepo.updateById(num, obj)
}

async function obtenerMailSession() {
    return await carritoRepo.getMailSession()
}

export default {
    guardar,
    listarTodas,
    eliminarTodos,
    eliminarPorId,
    modificar,
    listarPorId,
    listarPorMail,
    obtenerMailSession
}