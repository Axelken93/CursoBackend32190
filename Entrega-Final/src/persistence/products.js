import ProductsRepo from './repos/products.js'

const productosRepo = new ProductsRepo()

async function listarTodas() {
    return await productosRepo.getAll()
}

async function listarPorId(num) {
    let obtenido = await productosRepo.getById(num)
    return obtenido
}

async function listarPorCategory(categoria) {
    let obtenido = await productosRepo.getByCategory(categoria)
    return obtenido
}

async function guardar(obj) {
    let newProduct = obj
    let savedProduct = await productosRepo.save(newProduct)
    return savedProduct
}

async function eliminarTodos() {
    let eliminado = await productosRepo.deleteAll()
    return eliminado
}

async function eliminarPorId(num) {
    let eliminado = await productosRepo.deleteById(num)
    return eliminado
}

async function modificar(num, obj) {
    let modificado = await productosRepo.updateById(num, obj)
    return modificado
}

export default {
    guardar,
    listarTodas,
    eliminarTodos,
    eliminarPorId,
    modificar,
    listarPorId,
    listarPorCategory
}