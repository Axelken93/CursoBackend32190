import OrdenDaoMongo from './daos/ordenDaoMongo.js'
import {orderDB} from '../../utils/connection/mongodb.js'

const db = new OrdenDaoMongo(orderDB)

async function guardar(obj) {
    let nroOrden = await db.save(obj)
    return nroOrden
}


export default {
    guardar
}