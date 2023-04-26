import { transformarADTO } from "../dtos/carritoDtos.js"

export default class CarritoDaoMem {

    constructor() {
        this.carrito = []
    }

    init() {
        console.log('carrito dao en memoria -> listo!')
    }

    disconnect() {
        console.log('carrito dao en memoria -> cerrado!')
    }

    assignedNewId() {
        if (this.carrito.length === 0) {
            return 1
        } else {
            let IdArray = this.carrito.map((x) => {return x.id})
            let newId = (Math.max(...IdArray)) + 1
            return newId
        }
    }

    getIndex(id) {
        return this.carrito.findIndex(carrito => carrito.id === id)
    }

    getAll() {
        return transformarADTO(this.carrito)
    }

    getById(id) {
        if (this.getIndex(id) === -1 ) {
            return {Error: `Carrito con ID ${id} no encontrado`}
        } else {
            return transformarADTO(this.carrito[this.getIndex(id)])
        }
    }

    getByMail(mail) {
        let result = this.carrito.filter(objeto => objeto.mail === mail);
        if (result.length === 0) {
            return {Error: `No se encontro ningun carrito para el usuario: "${mail}"`}
        } else {
            return transformarADTO(result);
        }
    }

    save(carritoNuevo) {
        carritoNuevo.id = this.assignedNewId()
        this.carrito.push(carritoNuevo)
        return transformarADTO(carritoNuevo)
    }

    deleteById(id) {
        if (this.getIndex(id) === -1 ) {
            return {Error: `Carrito con ID ${id} no encontrado`}
        } else {
            const [ borrada ] = this.carrito.splice(this.getIndex(id), 1)
            return transformarADTO(borrada)
        }
    }

    deleteAll() {
        this.carrito = []
    }

    updateById(id, nuevo) {
        if (this.getIndex(id) === -1 ) {
            return {Error: `Carrito con ID ${id} no encontrado`}
        } else {
            const index = this.getIndex(id)
            const actualizado = { ...this.carrito[index], ...nuevo}
            this.carrito.splice(index, 1, actualizado)
            return transformarADTO(actualizado)
        }
    }
}
