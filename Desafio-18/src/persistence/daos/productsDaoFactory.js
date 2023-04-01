import ContenedorMongoDB from './productsDaoMongo.js'
import ContenedorProductos from './productsDaoFile.js'
import {productosDB} from '../../../utils/connection/mongodb.js'
import env from '../../../utils/config/variables.js'

let opcion = env.MODO || 'mongo'
let productsDao

switch (opcion) {
    case 'mongo':
        productsDao = new ContenedorMongoDB(productosDB)
        await productsDao.init()
        break
    default:
        productsDao = new ContenedorProductos('productos.txt')
        productsDao.init()
        break
}


export {productsDao}