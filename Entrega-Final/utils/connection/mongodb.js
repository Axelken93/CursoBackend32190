import mongoose from "mongoose";
import env from '../config/inputs.js';

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

async function mongoDisconnection() {
    try {
        await mongoose.disconnect()
        console.log("Desconectado correctamente de MongoDB")
    } catch {
        console.log(`Error: ${err}`)
    }
}

async function mongoConnection (){
    const URL = env.MongoUrl
    try{
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch(err){
        console.log(`Error: ${err}`)
    }
}

//------------------------------//
//--Esquemas de Bases de Datos--//
//------------------------------//
const productosCollName = 'productos'
const productosSchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    nombre: {type: String, required: true},
    categoria: {type: String, required: true},
    precio: {type: Number, required: true}
}, {versionKey: false})
const productosDB = mongoose.model(productosCollName, productosSchema)

//

const carritoCollName = 'carrito'
const carritoSchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    mail: {type: String, required: true},
    fecha: {type: String, required: true},
    productos: {type: Array, required: true},
    direccion: {type: String, required: true}
}, {versionKey: false})
const carritoDB = mongoose.model(carritoCollName, carritoSchema)

//

const sessionCollName = 'session'
const sessionSchema = new mongoose.Schema({}, {versionKey: false})
const sessionDB = mongoose.model(sessionCollName, sessionSchema)

//

const usersCollName = 'users'
const usersSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    direccion: {type: String, required: true},
    telefono: {type: Number, required: true},
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

//

const ordenCollName = 'orden'
const ordenSchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    mail: {type: String, required: true},
    fecha: {type: String, required: true},
    items: {type: Array, required: true},
    direccion: {type: String, required: true}

}, {versionKey: false})
const orderDB = mongoose.model(ordenCollName, ordenSchema)

//

export {
    mongoDBConnection,
    productosDB,
    carritoDB,
    sessionDB,
    usersDB,
    orderDB,
    messageDB,
    mongoDisconnection
};