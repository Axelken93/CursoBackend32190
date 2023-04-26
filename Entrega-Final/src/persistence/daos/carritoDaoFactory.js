import CarritoDaoMem from "./carritoDaoMemory.js";
import env from '../../../utils/config/inputs.js';
import CarritoDaoMongo from "./carritoDaoMongo.js";
import {carritoDB} from '../../../utils/connection/mongodb.js';

const opcion = env.PERSISTENCE || 'Mem'

let dao
switch (opcion) {
    case 'Mongo':
        dao = new CarritoDaoMongo(carritoDB)
        await dao.init()
        break
    default:
        dao = new CarritoDaoMem()
        dao.init()
}

export default class CarritoDaoFactory {
    static getDao() {
        return dao
    }
}