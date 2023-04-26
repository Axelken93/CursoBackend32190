import ProductosDaoMem from "./productsDaoMemory.js";
import env from '../../../utils/config/inputs.js';
import ProductosDaoFile from "./productsDaoFile.js";
import ProductosDaoMongo from "./productsDaoMongo.js";
import {productosDB} from '../../../utils/connection/mongodb.js';

const opcion = env.PERSISTENCE || 'Mem'

let dao
switch (opcion) {
    case 'Mongo':
        dao = new ProductosDaoMongo(productosDB)
        await dao.init()
        break
    case 'File':
        dao = new ProductosDaoFile('productos.txt')
        await dao.init()
        break
    default:
        dao = new ProductosDaoMem()
        dao.init()
}

export default class ProductosDaoFactory {
    static getDao() {
        return dao
    }
}