import ContenedorMongoDB from './containers/containerMongoDB.js'
import ContenedorProductos from './containers/containersFile.js'
import {productosDB, sessionDB, usersDB} from '../../utils/connection/mongodb.js'
import env from '../../utils/config/variables.js'

const modo = env.MODO || 'mongo'
let contenedor

switch (modo) {
    case 'mongo':
        contenedor = new ContenedorMongoDB(productosDB)
        break
    default:
        contenedor = new ContenedorProductos('productos.txt')
        break
}


async function guardar(obj) {
    let newProduct = obj
    await contenedor.save(newProduct)
}

async function listarTodas() {
    return await contenedor.getAll()
}

export default {
    guardar,
    listarTodas
}