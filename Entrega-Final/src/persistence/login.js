import LoginRepo from './repos/login.js'

const loginRepo = new LoginRepo()


async function cantSesiones() {
    let num = await loginRepo.cantidadSesiones()
    return parseInt(num)
}

async function destroySession() {
    await loginRepo.destruirSession()
}

async function obtenerTodosUsuarios() {
    let usuarios = await loginRepo.getUsers()
    return usuarios
}

async function sumarUsuario(nuevoUsuario) {
    await loginRepo.save(nuevoUsuario)
}


export default {
    cantSesiones,
    destroySession,
    obtenerTodosUsuarios,
    sumarUsuario
}