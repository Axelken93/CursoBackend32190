import ChatDaoFactory from "../daos/chatDaoFactory.js";
import { transformarADTO } from "../dtos/chatDto.js";

export default class MessageRepo {
    dao

    constructor() {
        this.dao = ChatDaoFactory.getDao()
    }

    async getAll() {
        const mensaje = await this.dao.getAll()
        return await mensaje.map(m => new transformarADTO(m))
    }

    async getByMail(mail) {
        const msj = await this.dao.getByMail(mail)
        return msj
    }

    async save(nuevo) {
        if (!nuevo.mail) {
            return {Error: "Campo 'mail' es requerido"}
        }
        if (!nuevo.nombre) {
            return {Error: "Campo 'nombre' es requerido"}
        }
        if (!nuevo.apellido) {
            return {Error: "Campo 'apellido' es requerido"}
        }
        if (!nuevo.edad) {
            return {Error: "Campo 'edad' es requerido"}
        }
        if (!nuevo.texto) {
            return {Error: "Campo 'texto' es requerido"}
        }
        let mensaje = await this.dao.save(nuevo)
        return mensaje
    } 
}

