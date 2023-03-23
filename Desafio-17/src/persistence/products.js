import ProductsRepo from './repos/products.js'
const productosRepo = new ProductsRepo()

async function guardar(obj) {
    let newProduct = obj
    await productosRepo.save(newProduct)
}

async function listarTodas() {
    return await productosRepo.getAll()
}

export default {
    guardar,
    listarTodas
}