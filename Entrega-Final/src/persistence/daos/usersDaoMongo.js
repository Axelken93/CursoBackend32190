import {mongoDBConnection, mongoDisconnection} from '../../../utils/connection/mongodb.js';

export default class UsersDaoMongo {

    constructor(dataBase) {
        this.db = dataBase
    }

    async init() {
        await mongoDBConnection()
    }

    async disconnect() {
        await mongoDisconnection()
    }

    async assignedNewId(){
        try {
            let newID
            const cantDoc = await this.db.countDocuments()
            
            if (cantDoc == 0) {
                return newID = 1
            }
            const ID = await this.db.find({}, {_id: 0, id:1}).sort({id: -1}).limit(1)
            newID = ID[0].id + 1
            return newID
        }
        catch (err) {
            console.log (`Hubo un error al asignar nuevo ID: ${err}`)
        }
    }

    async getAll() {
        try {
            const rta = await this.db.find({}, {_id: 0})
            return rta
        }
        catch (err) {
            console.log(`Hubo un error al intentar obtener todos los objetos: ${err}`)
        }
    }

    async save(objeto) {
        try {
            objeto.id = await this.assignedNewId()
            const saveModel = new this.db(objeto);
            await saveModel.save()
            console.log("Objeto guardado correctamente")
        }
        catch (err) {
            console.log(`Hubo un error al intentar guardar el objeto: ${err}`)
        }
    }
}

