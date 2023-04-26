import UsersDaoMongo from "../daos/usersDaoMongo.js";
import SessionDaoMongo from "../daos/sessionDaoMongo.js";
import {sessionDB, usersDB} from '../../../utils/connection/mongodb.js';
import { json } from "express";

function usersMongo() {
    let dao = new UsersDaoMongo(usersDB)
    dao.init()
    return dao
}

function sessionMongo() {
    let dao = new SessionDaoMongo(sessionDB)
    dao.init()
    return dao
}

export default class LoginRepo {

    constructor() {
        this.users = usersMongo() 
        this.session = sessionMongo()
    }


    async cantidadSesiones() {
        let cantidadSessiones = await this.session.countDoc()
        return cantidadSessiones
    }

    async destruirSession() {
        let eliminado = await this.session.deleteAll()
        return eliminado
    }
    
    async getUsers(){
        let usuarios = await this.users.getAll()
        return usuarios
    }

    async save(nuevoUsuario) {
        if (!nuevoUsuario.nombre) {
            return {Error: "Campo 'Nombre' es requerido"}
        }
        if (!nuevoUsuario.username) {
            return {Error: "Campo 'mail' es requerido"}
        }
        if (!nuevoUsuario.password) {
            return {Error: "Campo 'password' es requerido"}
        }
        if (!nuevoUsuario.direccion) {
            return {Error: "Campo 'direccion' es requerido"}
        }
        if (!nuevoUsuario.telefono) {
            return {Error: "Campo 'telefono' es requerido"}
        }
        if (typeof(nuevoUsuario.telefono) !== 'number') {
            return {Error: "Campo 'telefono' tiene que ser de tipo numerico"}
        }
        await this.users.save(nuevoUsuario)
    }

}
