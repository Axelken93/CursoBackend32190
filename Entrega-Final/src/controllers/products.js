import service from '../services/products.js'

async function getProducts(req, res) {
    let {categoria} = await req.params
    const products = await service.obtenerProductos(categoria)
    res.json(products)
}

async function getProductId(req, res) {
    let {num} = req.params
    const product = await service.obtenerProductoPorID(parseInt(num))
    res.json(product)
}

async function postProduct(req, res) {
    let productInfo = req.body
    let response = await service.agregarProducto(productInfo)
    res.json(response)
}

async function deleteProduct(req, res) {
    let eliminado = await service.eliminarProductos()
    res.json(eliminado)
}

async function deleteProductId(req, res) {
    let {num} = req.params
    let eliminado = await service.eliminarProductoPorId(parseInt(num))
    res.json(eliminado)
}

async function putProduct(req, res) {
    let {num} = req.params
    let nuevoProducto = req.body
    let modificado = await service.modificarProducto(parseInt(num),nuevoProducto)
    res.json(modificado)
}

export default {
    getProducts,
    postProduct,
    deleteProduct,
    deleteProductId,
    putProduct,
    getProductId
}