import {mongoDBConnection} from '../../../utils/connection/mongodb.js';

export default class OrdenDaoMongo {

    constructor(dataBase) {
        this.ordenes = dataBase
    }

    async assignedNewId(){
        let newID
        const cantDoc = await this.ordenes.countDocuments()
        if (cantDoc === 0) {
            let newId = 1
            return newId
        } else {
            const ID = await this.ordenes.find({}, {_id: 0, id:1}).sort({id: -1}).limit(1)
            newID = ID[0].id + 1
            return newID
        }
    }

    async save(ordenNueva) {
        await mongoDBConnection()
        let nroOrden = await this.assignedNewId()
        ordenNueva.id = nroOrden
        const saveModel = new this.ordenes(ordenNueva);
        await saveModel.save()
        return nroOrden
    }
}
