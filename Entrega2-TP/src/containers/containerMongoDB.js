import mongoose from "mongoose";
import * as productoModels from "../db/models/productosSchema.js";
import * as carritoModels from "../db/models/carritosSchema.js";
import {mongoDBConnection} from "../../utils/config.js";
import express from 'express'
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

class ContenedorMongoDB {
    constructor(db){
        this.db = db
    }

    async getAll() {
        try {
            await mongoDBConnection()
            const rta = await this.db.find({}, {_id: 0})
            return rta
        }
        catch (err) {
            console.log (`Hubo un error al intentar obtener todos los objetos: ${err}`)
        } finally {
            await mongoose.disconnect()
        }
    };

    async getbyID(num) {
        try {
            await mongoDBConnection()
            const rta = await this.db.find({id: {$eq: num}}, {_id: 0})
            return rta
        }
        catch (err) {
            console.log (`Hubo un error al intentar obtener el objeto con ID Nro ${num}: ${err}`)
        } finally {
            await mongoose.disconnect()
        }
    };

    async save(obj) {
        try {
            await mongoDBConnection()
            const objeto = obj
            const saveModel = new this.db(objeto);
            let objSave = await saveModel.save()
            console.log("Objeto guardado correctamente")
        }
        catch (err) {
            console.log (`Hubo un error al intentar guardar el objeto: ${err}`)
        } finally {
            await mongoose.disconnect()
        }
    };

    async insertProductOnChart(chartNum, productsList) {
        try {
            await mongoDBConnection()
            let products = productsList
            console.log(productsList)
            let carritoActualizado = await this.db.updateOne( {id: {$eq: chartNum}}, {
                $set: {productos: products}
            } )
            console.log(carritoActualizado)
            console.log("Objeto guardado correctamente")
        }
        catch (err) {
            console.log (`Hubo un error al intentar insertar el objeto: ${err}`)
        } finally {
            await mongoose.disconnect()
        }
    };

    async deleteByID(num) {
        try {
            await mongoDBConnection()
            let productDeleted = await this.db.deleteOne({id: {$eq: num}})
            console.log("Objeto eliminado correctamente")
            return productDeleted
        }
        catch (err) {
            console.log (`Hubo un error al intentar eliminar el objeto: ${err}`)
        } finally {
            await mongoose.disconnect()
        }
    };

    async deleteProducByChartID(chartNum, prodNum) {
        try {
            await mongoDBConnection()
            let carritoActual = await carritoMongodb.getbyID(parseInt(chartNum))
            let carritoViejo = carritoActual[0]

            let nuevoCarrito = {id: carritoViejo.id, timestamp: carritoViejo.timestamp}

            let productosExistentes = await carritoMongodb.getbyID(parseInt(chartNum))
            let arrayProductosExistentes = []
            for (const producto of productosExistentes) {
                arrayProductosExistentes.push(producto.productos)
            }
            arrayProductosExistentes = arrayProductosExistentes[0]

            let newArray = []
            for (const e of arrayProductosExistentes) {
                if (e.id != prodNum)
                    newArray.push(e)
            }

            nuevoCarrito.productos = newArray
            await mongoDBConnection()
            await this.db.deleteOne({id: {$eq: chartNum}})
            const saveModel = new this.db(nuevoCarrito);
            let objSave = await saveModel.save()
        }
        catch (err) {
            console.log (`Hubo un error al intentar eliminar el producto: ${err}`)
        } finally {
            await mongoose.disconnect()
        }
    };

    async deleteAll() {
        try {
            await mongoDBConnection()
            let productDeleted = await this.db.deleteMany({})
            console.log("Objetos eliminado correctamente")
            return productDeleted
        }
        catch (err) {
            console.log (`Hubo un error al intentar eliminar el objeto: ${err}`)
        } finally {
            await mongoose.disconnect()
        }
    };

};

async function checkId(num){
    try {
        await mongoDBConnection()
        const ID = await productoModels.productos.find({}, {_id: 0, id:1})
        let arrayID =[]
        await ID.forEach(e => {
            arrayID.push(e.id)
        });
        if (arrayID.some((e) => {return e == num})) {
            return true
        } else {return false}
    }
    catch (err) {
        console.log (`Hubo un error al validar el ID: ${err}`)
    } finally {
        await mongoose.disconnect()
    }
}

async function checkChartId(num){
    try {
        await mongoDBConnection()
        const ID = await carritoModels.carritos.find({}, {_id: 0, id:1})
        let arrayID =[]
        await ID.forEach(e => {
            arrayID.push(e.id)
        });
        if (arrayID.some((e) => {return e == num})) {
            return true
        } else {return false}
    }
    catch (err) {
        console.log (`Hubo un error al validar el ID: ${err}`)
    } finally {
        await mongoose.disconnect()
    }
}

async function assignedNewId(){
    try {
        await mongoDBConnection()
        const ID = await productoModels.productos.find({}, {_id: 0, id:1}).sort({id: -1}).limit(1)
        let newID= ID[0].id + 1
        return newID
    }
    catch (err) {
        console.log (`Hubo un error al asignar nuevo ID: ${err}`)
    } finally {
        await mongoose.disconnect()
    }
}

async function assignedNewChartId(){
    try {
        await mongoDBConnection()
        const ID = await carritoModels.carritos.find({}, {_id: 0, id:1}).sort({id: -1}).limit(1)
        let newID= ID[0].id + 1
        return newID
    }
    catch (err) {
        console.log (`Hubo un error al asignar nuevo ID: ${err}`)
    } finally {
        await mongoose.disconnect()
    }
}

async function checkIfNewProductExist(chartNum, prodNum){
    try {
        let productosExistentes = await carritoMongodb.getbyID(parseInt(chartNum))
        let arrayProductosExistentes = []
        for (const producto of productosExistentes) {
            arrayProductosExistentes.push(producto.productos)
        }
        arrayProductosExistentes = arrayProductosExistentes[0]
        let arrayIdExistente = []
        for (const prod of arrayProductosExistentes) {
            arrayIdExistente.push(prod.id)
        }

        if (arrayIdExistente.some((e) => {return e == prodNum})) {
            return false
        } else {return true}
    }
    catch (err) {
        console.log (`Hubo un error al realizar la validación: ${err}`)
    } finally {
        await mongoose.disconnect()
    }
}

const productMongodb = new ContenedorMongoDB(productoModels.productos);
const carritoMongodb = new ContenedorMongoDB(carritoModels.carritos);

carritoMongodb.deleteProducByChartID(6,1)

export {productMongodb, carritoMongodb, checkId, checkChartId, assignedNewId, assignedNewChartId, checkIfNewProductExist};

