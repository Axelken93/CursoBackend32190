import { transformarADTO } from "../dtos/productsDtos.js"

export default class ProductosDaoMem {

    constructor() {
        this.productos = []
    }

    init() {
        console.log('productos dao en memoria -> listo!')
    }

    disconnect() {
        console.log('productos dao en memoria -> cerrado!')
    }

    assignedNewId() {
        if (this.productos.length === 0) {
            return 1
        } else {
            let IdArray = this.productos.map((x) => {return x.id})
            let newId = (Math.max(...IdArray)) + 1
            return newId
        }
    }

    getIndex(id) {
        return this.productos.findIndex(producto => producto.id === id)
    }

    getAll() {
        return transformarADTO(this.productos)
    }

    getById(id) {
        if (this.getIndex(id) === -1 ) {
            return {Error: `Producto con ID ${id} no encontrado`}
        } else {
            return transformarADTO(this.productos[this.getIndex(id)])
        }
    }

    getByCategory(categoria) {
        let result = this.productos.filter(objeto => objeto.categoria === categoria);
        if (result.length === 0) {
            return {Error: `No se encontro ningun producto en la categoria "${categoria}"`}
        } else {
            return transformarADTO(result);
        }
      }

    save(productoNuevo) {
        productoNuevo.id = this.assignedNewId()
        this.productos.push(productoNuevo)
        return transformarADTO(productoNuevo)
    }

    deleteById(id) {
        if (this.getIndex(id) === -1 ) {
            return {Error: `Producto con ID ${id} no encontrado`}
        } else {
            const [ borrada ] = this.productos.splice(this.getIndex(id), 1)
            return transformarADTO(borrada)
        }
    }

    deleteAll() {
        this.productos = []
    }

    updateById(id, nuevo) {
        if (this.getIndex(id) === -1 ) {
            return {Error: `Producto con ID ${id} no encontrado`}
        } else {
            const index = this.getIndex(id)
            const actualizado = { ...this.productos[index], ...nuevo}
            this.productos.splice(index, 1, actualizado)
            return transformarADTO(actualizado)
        }
    }
}
