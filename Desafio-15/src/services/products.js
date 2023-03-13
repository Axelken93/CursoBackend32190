import db from '../persistence/products.js'



async function obtenerProductos() {
    let products = await db.listarTodas()
    return products
}

async function sumarProducto(productInfo) {
    await db.guardar(productInfo)
}

export default {
    obtenerProductos,
    sumarProducto
}