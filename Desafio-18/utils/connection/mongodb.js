import mongoose from "mongoose";
import env from '../config/variables.js'

//Singleton de conexion a base de datos
export default class SelectedPersistence {
    static instancia

    constructor() {
        if (!SelectedPersistence.instancia) {
            mongoConnection()
            this.value = 'Conectados correctamente a MongoDB'
            SelectedPersistence.instancia = this;
        } else {
            return SelectedPersistence.instancia;
        }
    }

    printValue() {
        return console.log(this.value)
    }

}

async function mongoDBConnection() {
    let conn = new SelectedPersistence()
    return conn.printValue()
}


async function mongoConnection (){
    const URL = env.MongoUrl
    try{
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Conectados a MongoDB correctamente")
    } catch(err){
        console.log(`Error: ${err}`)
    }
}

//------------------------------//
//--Esquemas de Bases de Datos--//
//------------------------------//
const productosCollName = 'productos'
const productosSchema = new mongoose.Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    thumbnail: {type: String, required: true},
    id: {type: Number, required: true, unique: true}
}, {versionKey: false})
const productosDB = mongoose.model(productosCollName, productosSchema)

//

const sessionCollName = 'session'
const sessionSchema = new mongoose.Schema({}, {versionKey: false})
const sessionDB = mongoose.model(sessionCollName, sessionSchema)

//

const usersCollName = 'users'
const usersSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    id: {type: Number, required: true, unique: true}
}, {versionKey: false})
const usersDB = mongoose.model(usersCollName, usersSchema)

//

const messagesCollName = 'messages'
const messagesSchema = new mongoose.Schema({
    mail: {type: String, required: true},
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    edad: {type: Number, required: true},
    texto: {type: String, required: true},
    fecha: {type: String, required: true}
}, {versionKey: false})
const messageDB = mongoose.model(messagesCollName, messagesSchema)


export {
    mongoDBConnection,
    productosDB,
    sessionDB,
    usersDB,
    messageDB
};