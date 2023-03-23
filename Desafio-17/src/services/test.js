import { faker } from '@faker-js/faker'
faker.locale = 'es'

async function generarProducto() {
    return {
        title: faker.hacker.noun(),
        price: faker.finance.amount(),
        thumbnail: faker.image.image()
    }
}


async function obtenerFakers() {
    let products = []
    let cantidadProductos = 5
    for (let i = 0; i < cantidadProductos; i++) {
        const newProduct = await generarProducto()
        products.push(newProduct)
    }
    
    return products
}


export default {
    obtenerFakers
}