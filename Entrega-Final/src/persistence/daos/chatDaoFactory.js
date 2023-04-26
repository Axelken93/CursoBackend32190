import ChatDaoMongo from './chatDaoMongo.js'
import ChatDaoMemory from './chatDaoMemory.js'
import {messageDB} from '../../../utils/connection/mongodb.js'
import env from '../../../utils/config/inputs.js'

const opcion = env.PERSISTENCE || 'Mem'
let dao

switch (opcion) {
    case 'Mongo':
        dao = new ChatDaoMongo(messageDB)
        dao.init()
        break
    default:
        dao = new ChatDaoMemory()
        dao.init()
        break
}

export default class ChatDaoFactory {
    static getDao() {
        return dao
    }
}