import messageDao from "../daos/messageDaoFactory.js";
import { transformarADTO } from "../dtos/messagesDto.js";
import Mensaje from "../models/message.js";

export default class MessageRepo {
    dao

    constructor() {
        this.dao = messageDao
    }

    async getAll() {
        const mensaje = await this.dao.getAll()
        return await mensaje.map(m => new Mensaje(m).datos())
    }

    async getById(id) {
        const msj = await this.dao.getById(id)
        return new Mensaje(msj)
    }

    async save(nuevo) {
        await this.dao.save(transformarADTO(nuevo))
        return nuevo
    } 

    async deleteById(id) {
        const removida = await this.dao.deleteById(id)
        return new Mensaje(removida)
    }

    async deleteAll() {
        await this.dao.deleteAll()
    }
}

let prueba = new MessageRepo()
let axel = await prueba.getAll()
