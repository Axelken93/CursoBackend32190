import ProductsRepo from './repos/products.js'
import Producto from "../persistence/models/products.js";
const productosRepo = new ProductsRepo()

async function guardar(obj) {
    let newProduct = obj
    let nuevo = await productosRepo.save(newProduct)
    return new Producto(nuevo).datos()
}

async function listarTodas() {
    return await productosRepo.getAll()
}

export default {
    guardar,
    listarTodas
}