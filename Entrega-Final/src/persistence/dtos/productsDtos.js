export default class ProductosDTO {
    constructor({ id, nombre, categoria, precio }) {
        this.id = id
        this.nombre = nombre
        this.categoria = categoria
        this.precio = precio
    }
}

export function transformarADTO(productos) {
    if (Array.isArray(productos)) {
        return productos.map(p => new ProductosDTO(p))
    } else {
        return new ProductosDTO(productos)
    }
}