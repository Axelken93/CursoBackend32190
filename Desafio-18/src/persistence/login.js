import ContenedorMongoDB from './daos/loginDaoMongo.js'
import {sessionDB, usersDB} from '../../utils/connection/mongodb.js'


let contenedorUsers = new ContenedorMongoDB(usersDB)
await contenedorUsers.init()
let contenedorSession = new ContenedorMongoDB(sessionDB)
await contenedorSession.init()



async function cantSesiones() {
    let cantidadSessiones = await contenedorSession.countDoc()
    return cantidadSessiones
}

async function getUser(){
    let cantidad = await contenedorSession.countDoc()
    if (cantidad !== 0) {
        let user = await contenedorSession.getSession()
        .then((x)=> {
            let data = JSON.stringify(x)
            return data
        })
        .then((data)=>{
            let stringData = JSON.parse(data).session
            let jsonData = JSON.parse(stringData)
            return jsonData.passport
        })
        .then((e)=>{
            let element = e.user
            return element
        })
        return user
    }
}

async function destroySession() {
    let eliminado = await contenedorSession.deleteAll()
    return eliminado
}

async function getActiveUserInfo(){
    let sessionName = await getUser()
    let name = await contenedorUsers.getbyUsername(sessionName)
    let userInfo = name[0]
    return userInfo
}

async function obtenerTodosUsuarios(){
    let objs = contenedorUsers.getAll()
    return objs
}

async function sumarUsuario(newUser){
    await contenedorUsers.save(newUser)
}


export default {
    cantSesiones,
    getUser,
    destroySession,
    getActiveUserInfo,
    obtenerTodosUsuarios,
    sumarUsuario
}