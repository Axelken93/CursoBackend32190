import mongoose, { set } from "mongoose";

const sessionCollName = 'session'
const sessionSchema = new mongoose.Schema({}, {versionKey: false})
const sessionSc = mongoose.model(sessionCollName, sessionSchema)



async function mongoDBConnection (){
    const URL = "mongodb+srv://axelken93:Racing200793@backend32190.e4b0dmz.mongodb.net/chat+productos?retryWrites=true&w=majority"
    try{
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch(err){
        console.log(`Error: ${err}`)
    }
}

class ContenedorMongoDB {
    constructor(db){
        this.db = db
    }

async getSession() {
    try {
        await mongoDBConnection()
        const rta = await this.db.find({}, {_id: 0})
        let session = rta[0]
        return session
    }
    catch (err) {
        console.log (`Hubo un error al intentar obtener todos los usuarios: ${err}`)
    } 
    // finally {
    //     await mongoose.disconnect()
    // }
};

async deleteAll() {
    try {
        await mongoDBConnection()
        let productDeleted = await this.db.deleteMany({})
        return productDeleted
    }
    catch (err) {
        console.log (`Hubo un error al intentar eliminar el objeto: ${err}`)
    } 
    // finally {
    //     await mongoose.disconnect()
    // }
};

async countDoc() {
    try {
        await mongoDBConnection()
        const rta = await this.db.countDocuments()
        return rta
    }
    catch (err) {
        console.log (`Hubo un error al intentar contar todos los objetos: ${err}`)
    } 
    // finally {
    //     await mongoose.disconnect()
    // }
};
}

const sessionMongodb = new ContenedorMongoDB(sessionSc);

async function cantSesiones() {
    let cantidadSessiones = await sessionMongodb.countDoc()
    return cantidadSessiones
}

let cantidadSessiones = await sessionMongodb.countDoc()

async function getUser(){
    let cantidad = await sessionMongodb.countDoc()
    if (cantidad !== 0) {
        let user = sessionMongodb.getSession()
        .then((x)=> {
            let data = JSON.stringify(x)
            return data
        })
        .then((data)=>{
            let stringData = JSON.parse(data).session
            let jsonData = JSON.parse(stringData)
            return jsonData.user
        })
        return user
    }

}

async function getExpires(time){
    let qTime = parseInt(time)
    let cantidad = await sessionMongodb.countDoc()
    if (cantidad !== 0) {
        let user = sessionMongodb.getSession()
        .then((x)=> {
            let data = JSON.stringify(x)
            return data
        })
        .then((data)=>{
            let jsonData = JSON.parse(data)

            //new expires date in expires object
            let time = new Date
            let msTime = time.getTime() + qTime
            let newTime = new Date (msTime)
            let newTimeString = newTime.toISOString()


            // //new expires date in expires object
            // let time = Date.parse(jsonData.expires)
            // let msTime = time + 60000
            // let newTime = new Date (msTime)
            // let newTimeString = newTime.toISOString()

            //new expires date in session object
            let sessionData = JSON.parse(jsonData.session)
            sessionData.cookie.expires = newTimeString

            //Modificacion objeto
            jsonData.expires = newTime
            jsonData.session = sessionData

            return jsonData
        })
        return user
    }
}


async function destroySession() {
    let eliminado = await sessionMongodb.deleteAll()
    return eliminado
}


// getExpires().then((c) => {
//     console.log("/////////////////// EXPIRES:")
//     console.log(c)})


export {getUser, sessionMongodb, cantSesiones, destroySession, getExpires}


