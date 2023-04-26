import { transformarADTO } from "../dtos/productsDtos.js"
import {mongoDBConnection, mongoDisconnection} from '../../../utils/connection/mongodb.js';

export default class ProductosDaoMongo {

    constructor(dataBase) {
        this.productos = dataBase
    }

    async init() {
        await mongoDBConnection()
    }

    async disconnect() {
        await mongoDisconnection()
    }

    async assignedNewId(){
        let newID
        const cantDoc = await this.productos.countDocuments()
        if (cantDoc === 0) {
            let newId = 1
            return newId
        } else {
            const ID = await this.productos.find({}, {_id: 0, id:1}).sort({id: -1}).limit(1)
            newID = ID[0].id + 1
            return newID
        }
    }

    async checkId(num){
        const ID = await this.productos.find({}, {_id: 0, id:1})
        let arrayID =[]
        await ID.forEach(e => {
            arrayID.push(e.id)
        });

        if (arrayID.some((e) => {return e == num})) {
            return true
        } else {
            return false
        }
    }

    async getAll() {
        const productos = await this.productos.find({}, {_id: 0})
        return transformarADTO(productos)
    }

    async getById(num) {
        if (await this.checkId(num)) {
            const persona = await this.productos.find({id: {$eq: num}}, {_id: 0})
            return transformarADTO(persona)
        } else {
            return {Error: `Producto con ID ${num} no encontrado`}
        }
    }

    async getByCategory(categoria) {
        let result = await this.productos.find({categoria: {$eq: categoria}}, {_id: 0})
        if (result.length === 0) {
            return {Error: `No se encontro ningun producto en la categoria "${categoria}"`}
        } else {
            return transformarADTO(result);
        }
      }

    async save(personaNueva) {
        personaNueva.id = await this.assignedNewId()
        const saveModel = new this.productos(personaNueva);
        await saveModel.save()
        return transformarADTO(personaNueva)
    }

    async deleteById(num) {
        if (await this.checkId(num)) {
            const borrada = await this.productos.find({id: {$eq: num}}, {_id: 0})
            await this.productos.deleteOne({id: {$eq: num}})
            return transformarADTO(borrada)
        } else {
            return {Error: `Producto con ID ${num} no encontrado`}
        }
    }

    async deleteAll() {
        await this.productos.deleteMany({})
    }

    async updateById(id, nuevo) {
        if (await this.checkId(id)) {
            await this.productos.findOneAndUpdate({id: id}, { $set: nuevo})
            nuevo.id = id
            return transformarADTO(nuevo)
        } else {
            return {Error: `Producto con ID ${id} no encontrado`}
        }
    }
}
