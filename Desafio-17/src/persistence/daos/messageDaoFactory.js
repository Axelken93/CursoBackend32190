import ContenedorMongoDB from './messageDaoMongo.js'
import ContenedorMensajes from './messageDaoFile.js'
import {messageDB} from '../../../utils/connection/mongodb.js'
import env from '../../../utils/config/variables.js'

let opcion = env.MODO || 'mongo'
let dao

switch (opcion) {
    case 'mongo':
        dao = new ContenedorMongoDB(messageDB)
        dao.init()
        break
    default:
        dao = new ContenedorMensajes('mensajes.txt')
        dao.init()
        break
}

export default dao