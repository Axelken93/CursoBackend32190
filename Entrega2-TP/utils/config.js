import mongoose from "mongoose";
import admin from "firebase-admin"
import serviceAccount from './../src/db/firebase/dos-entrega-final-backend-firebase-adminsdk-n3wj5-cf6c91ffbc.json' assert {type: "json"};

function selectDB(databaseName){
    let nombre = databaseName.toLowerCase()
    let carrito = ""
    let productos = ""

    if (nombre == "mongo"){
        carrito = './routes/carritoMongoDB.js'
        productos = './routes/productosMongoDB.js'
    } else if (nombre == "firebase") {
        carrito = './routes/carritoFirebase.js'
        productos = './routes/productosFirebase.js'
    } else if (nombre == "archivos") {
        carrito = './routes/carrito.js'
        productos = './routes/productos.js'
    } else {
        console.log(`Base de Datos erronea: Favor de ingresar alguna de las siguientes opciones:
        1) Mongo
        2) Firebase
        3) Archivos`)
    }
    return {carrito , productos}
}


async function mongoDBConnection (){
    const URL = "mongodb+srv://axelken93:Racing200793@backend32190.e4b0dmz.mongodb.net/ecommerce?retryWrites=true&w=majority"
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


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: './../src/db/firebase/dos-entrega-final-backend-firebase-adminsdk-n3wj5-cf6c91ffbc.json'
    });

const fb = admin.firestore()


let prueba1 = "Holaaaaaaa"


export {mongoDBConnection, fb, selectDB, prueba1};

