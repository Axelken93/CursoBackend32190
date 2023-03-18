import {mongoDBConnection} from '../../../utils/connection/mongodb.js';
import {transformarADTO} from '../dtos/messagesDto.js'

export default class ContenedorMongoDB {
    constructor(db){
        this.db = db
    }

    async init() {
        await mongoDBConnection()
    }

    async getAll() {
        try {
            const rta = await this.db.find({}, {_id: 0})
            //return rta
            return transformarADTO(rta)
        }
        catch (err) {
            console.log(`Hubo un error al intentar obtener todos los objetos: ${err}`)
        }
    };

    async getbyID(num) {
        try {
            const rta = await this.db.find({id: {$eq: num}}, {_id: 0})
            //return rta
            return transformarADTO(rta)
        }
        catch (err) {
            console.log(`Hubo un error al intentar obtener el objeto con ID Nro ${num}: ${err}`)
        }
    };

    async getbyUsername(username) {
        try {
            const rta = await this.db.find({mail: {$eq: username}}, {_id: 0})
            //return rta
            return transformarADTO(rta)
        }
        catch (err) {
            console.log(`Hubo un error al intentar obtener el objeto con Username ${username}: ${err}`)
        }
    };

    async save(obj) {
        try {
            const objeto = obj
            objeto.id = await this.assignedNewId()
            const saveModel = new this.db(objeto);
            await saveModel.save()
            console.log("Objeto guardado correctamente")
        }
        catch (err) {
            console.log(`Hubo un error al intentar guardar el objeto: ${err}`)
        }
    };

    async deleteByID(num) {
        try {
            let productDeleted = await this.db.deleteOne({id: {$eq: num}})
            console.log("Objeto eliminado correctamente")
            //return productDeleted
            return transformarADTO(productDeleted)
        }
        catch (err) {
            console.log(`Hubo un error al intentar eliminar el objeto: ${err}`)
        }
    };

    async deleteAll() {
        try {
            let productDeleted = await this.db.deleteMany({})
            console.log("Objetos eliminado correctamente")
            //return productDeleted
            return transformarADTO(productDeleted)
        }
        catch (err) {
            console.log (`Hubo un error al intentar eliminar el objeto: ${err}`)
        }
    };

    async countDoc() {
        try {
            const rta = await this.db.countDocuments()
            return rta
        }
        catch (err) {
            console.log(`Hubo un error al intentar contar todos los objetos: ${err}`)
        } 
    };

    async checkId(num){
        try {
            const ID = await this.db.find({}, {_id: 0, id:1})
            let arrayID =[]
            await ID.forEach(e => {
                arrayID.push(e.id)
            });
            if (arrayID.some((e) => {return e == num})) {
                return true
            } else {return false}
        }
        catch (err) {
            console.log (`Hubo un error al validar el ID: ${err}`)
        }
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
};
