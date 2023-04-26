import {mongoDBConnection} from '../../../utils/connection/mongodb.js';
import {transformarADTO} from '../dtos/chatDto.js'

export default class ChatDaoMongo {
    constructor(db){
        this.db = db
    }

    async init() {
        await mongoDBConnection()
    }
    
    async getAll() {
        try {
            const rta = await this.db.find({}, {_id: 0})
            return transformarADTO(rta)
        }
        catch (err) {
            console.log(`Hubo un error al intentar obtener todos los objetos: ${err}`)
        }
    };

    async getByMail(mail) {
        try {
            const rta = await this.db.find({mail: {$eq: mail}}, {_id: 0})
            return transformarADTO(rta)
        }
        catch (err) {
            console.log(`Hubo un error al intentar obtener el objeto con mail ${mail}: ${err}`)
        }
    };

    async save(obj) {
        try {
            const saveModel = new this.db(obj);
            await saveModel.save()
            console.log("Objeto guardado correctamente")
        }
        catch (err) {
            console.log(`Hubo un error al intentar guardar el objeto: ${err}`)
        }
    };
};
