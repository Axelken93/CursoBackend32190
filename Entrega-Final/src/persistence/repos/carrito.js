import CarritoDaoFactory from "../daos/carritoDaoFactory.js";
import { transformarADTO } from "../dtos/carritoDtos.js";
import SessionDaoMongo from "../daos/sessionDaoMongo.js";
import {sessionDB} from '../../../utils/connection/mongodb.js';

export default class CarritoRepo {
    dao

    constructor() {
        this.dao = CarritoDaoFactory.getDao()
    }

    async getMailSession() {
        let user = new SessionDaoMongo(sessionDB)
        await user.init()
        let session = JSON.stringify(await user.getSession())
        let jsonSession = JSON.parse(session)
        let activeSession = JSON.parse(jsonSession.session)
        return activeSession.user
    }

    async getAll() {
        const carritos = await this.dao.getAll()
        return carritos.map(c => transformarADTO(c))
    }

    async getById(id) {
        const carrito = await this.dao.getById(id)
        return carrito
    }

    async getByMail(mail) {
        const carrito = await this.dao.getByMail(mail)
        return carrito
    }


    async save(nuevo) {
        if (!nuevo.productos) {
            return {Error: "Campo 'Productos' es requerido"}
        }
        if (!nuevo.direccion) {
            return {Error: "Campo 'Dirección' es requerido"}
        }

        nuevo.mail = await this.getMailSession()
        nuevo.fecha = new Date().toLocaleString()
        let savedProduct = await this.dao.save(transformarADTO(nuevo))
        return savedProduct
    } 

    async deleteById(id) {
        const removida = await this.dao.deleteById(id)
        return removida
    }

    async deleteAll() {
        await this.dao.deleteAll()
        return {Estatus: 'Objeto eliminado correctamente'}
    }

    async updateById(id, obj) {
        let modificado = await this.dao.updateById(id, obj)
        return modificado
    }
}