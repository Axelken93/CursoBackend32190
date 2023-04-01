import db from '../persistence/products.js'

async function obtenerProductos() {
    let products = await db.listarTodas()
    return products
}

async function sumarProducto(productInfo) {
    if (!productInfo) {
        return console.log('Debe ingresar un Producto')
        //throw new Error('Variable inexistente');
    } else {
        let nuevoProducto = await db.guardar(productInfo)
        return nuevoProducto
    }
}

export default {
    obtenerProductos,
    sumarProducto
}