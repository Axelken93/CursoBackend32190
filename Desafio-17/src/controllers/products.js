import service from '../services/products.js'

async function goToHome(req, res) {
    res.sendFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-16/src/public/index.html')
}

async function getProducts(req, res) {
    const products = await service.obtenerProductos()
    //Desafio 17
    res.send(products)
    //res.render('index', {products})
}

async function postProduct(req, res) {
    let productInfo = await req.body
    await service.sumarProducto(productInfo)
}

export default {
    goToHome,
    getProducts,
    postProduct
}