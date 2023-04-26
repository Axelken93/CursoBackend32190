import db from '../persistence/products.js'

async function obtenerProductos(categoria) {
    let numero = parseInt(categoria)
    if(isNaN(numero)) {
        if (!categoria) {
            let products = await db.listarTodas()
            return products
        } else {
            let product = await db.listarPorCategory(categoria)
            return product
        }
    } else {
        let products = await db.listarPorId(numero)
        return products
    }
}

async function obtenerProductoPorCategoria(categoria) {
    let product = await db.listarPorCategory(categoria)
    return product
}

async function obtenerProductoPorID(num) {
    let product = await db.listarPorId(num)
    return product
}

async function agregarProducto(productInfo) {
    let saveProduct = await db.guardar(productInfo)
    return saveProduct
}

async function eliminarProductos() {
    let productosEliminados = await db.eliminarTodos()
    return productosEliminados
}

async function eliminarProductoPorId(num) {
    let productoEliminado = await db.eliminarPorId(num)
    return productoEliminado
}

async function modificarProducto(num, obj) {
    let productoModificado = await db.modificar(num, obj)
    return productoModificado
}

export default {
    obtenerProductos,
    agregarProducto,
    eliminarProductos,
    eliminarProductoPorId,
    modificarProducto,
    obtenerProductoPorID,
    obtenerProductoPorCategoria
}