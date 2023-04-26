import {mongoDBConnection, mongoDisconnection} from '../../../utils/connection/mongodb.js';

export default class SessionDaoMongo {

    constructor(dataBase) {
        this.db = dataBase
    }

    async init() {
        await mongoDBConnection()
    }

    async disconnect() {
        await mongoDisconnection()
    }

    async countDoc() {
        try {
            const rta = await this.db.countDocuments()
            return rta
        }
        catch (err) {
            console.log(`Hubo un error al intentar contar todos los objetos: ${err}`)
        } 
    }

    async deleteAll() {
        try {
            let productDeleted = await this.db.deleteMany({})
            console.log("Objetos eliminado correctamente")
            return productDeleted
        }
        catch (err) {
            console.log (`Hubo un error al intentar eliminar el objeto: ${err}`)
        }
    }

    async getSession() {
        try {
            const rta = await this.db.find({}, {_id: 0})
            let session = rta[0]
            return session
        }
        catch (err) {
            console.log(`Hubo un error al intentar obtener todos los usuarios: ${err}`)
        } 
    }
}
