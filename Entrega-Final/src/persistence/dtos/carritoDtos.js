export default class CarritoDTO {
    constructor({ id, mail, fecha, productos, direccion }) {
        this.id = id
        this.mail = mail
        this.fecha = fecha
        this.productos = productos
        this.direccion = direccion
    }
}

export function transformarADTO(carrito) {  
    if (Array.isArray(carrito)) {
        return carrito.map(c => new CarritoDTO(c))
    } else {
        return new CarritoDTO(carrito)
    }
}