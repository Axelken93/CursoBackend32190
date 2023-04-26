import { transformarADTO } from "../dtos/carritoDtos.js"
import {mongoDBConnection, mongoDisconnection} from '../../../utils/connection/mongodb.js';

export default class CarritoDaoMongo {

    constructor(dataBase) {
        this.carrito = dataBase
    }

    async init() {
        await mongoDBConnection()
    }

    async disconnect() {
        await mongoDisconnection()
    }

    async assignedNewId(){
        let newID
        const cantDoc = await this.carrito.countDocuments()
        if (cantDoc === 0) {
            let newId = 1
            return newId
        } else {
            const ID = await this.carrito.find({}, {_id: 0, id:1}).sort({id: -1}).limit(1)
            newID = ID[0].id + 1
            return newID
        }
    }

    async checkId(num){
        const ID = await this.carrito.find({}, {_id: 0, id:1})
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

    async checkMail(mail){
        const carritos = await this.getAll()
        let arrayMails =[]
        await carritos.forEach(c => {
            arrayMails.push(c.mail)
        });
        if (arrayMails.some((e) => {return e == mail})) {
            return true
        } else {
            return false
        }
    }

    async getAll() {
        const carrito = await this.carrito.find({}, {_id: 0})
        return transformarADTO(carrito)
    }

    async getById(num) {
        if (await this.checkId(num)) {
            const carrito = await this.carrito.find({id: {$eq: num}}, {_id: 0})
            return transformarADTO(carrito)
        } else {
            return {Error: `Carrito con ID ${num} no encontrado`}
        }
    }

    async getByMail(mail) {
        let result = await this.carrito.find({mail: {$eq: mail}}, {_id: 0})
        if (result.length === 0) {
            return {Error: `No se encontro ningun carrito para el usuario: "${mail}"`}
        } else {
            return transformarADTO(result);
        }
      }

    async save(carritoNuevo) {
        if (await this.checkMail(carritoNuevo.mail)) {
            return {Error: 'Usted ya posee un carrito, favor de modificar el carrito actual'}
        } else {
            carritoNuevo.id = await this.assignedNewId()
            const saveModel = new this.carrito(carritoNuevo);
            await saveModel.save()
            return transformarADTO(carritoNuevo)
        }
    }

    async deleteById(num) {
        if (await this.checkId(num)) {
            const borrada = await this.carrito.find({id: {$eq: num}}, {_id: 0})
            await this.carrito.deleteOne({id: {$eq: num}})
            return transformarADTO(borrada)
        } else {
            return {Error: `Carrito con ID ${num} no encontrado`}
        }
    }

    async deleteAll() {
        await this.carrito.deleteMany({})
    }

    async updateById(id, nuevo) {
        if (await this.checkId(id)) {
            await this.carrito.findOneAndUpdate({id: id}, { $set: nuevo})
            nuevo.id = id
            return transformarADTO(nuevo)
        } else {
            return {Error: `Carrito con ID ${id} no encontrado`}
        }
    }
}