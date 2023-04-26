import fs from 'fs';
import { transformarADTO } from "../dtos/productsDtos.js";

export default class ProductosDaoFile {

    constructor(ruta) {
        this.ruta = `./src/persistence/db/${ruta}`
        this.productos = []
    }

    async init() {
        try {
            await fs.promises.readFile(this.ruta, 'utf-8')
            console.log('Productos dao en archivo -> listo!')
        } catch {
            await fs.promises.writeFile(this.ruta, '[]')
            console.log('Productos dao en archivo -> listo!')
        }
    }

    async disconnect() {
        console.log('Productos dao en archivo -> cerrado!')
    }

    async leerArchivo() {
        const texto = await fs.promises.readFile(this.ruta, 'utf-8')
        this.productos = JSON.parse(texto)
    }

    async escribirArchivo() {
        const texto = JSON.stringify(this.productos, null, 2)
        await fs.promises.writeFile(this.ruta, texto)
    }

    getIndex(id) {
        return this.productos.findIndex(persona => persona.id === id)
    }

    async assignedNewId() {
        if (this.productos.length === 0) {
            return 1
        } else {
            let IdArray = this.productos.map((x) => {return x.id})
            let newId = (Math.max(...IdArray)) + 1
            return newId
        }
    }

    async getAll() {
        await this.leerArchivo()
        return transformarADTO(this.productos)
    }

    async getById(id) {
        if (this.getIndex(id) === -1 ) {
            return {Error: `Producto con ID ${id} no encontrado`}
        } else {
            await this.leerArchivo()
            return transformarADTO(this.productos[this.getIndex(id)])
        }
    }

    async getByCategory(categoria) {
        await this.leerArchivo()
        let result = this.productos.filter(objeto => objeto.categoria === categoria);
        if (result.length === 0) {
            return {Error: `No se encontro ningun producto en la categoria "${categoria}"`}
        } else {
            return transformarADTO(result);
        }
      }

    async save(nuevoProducto) {
        await this.leerArchivo()
        nuevoProducto.id = await this.assignedNewId()
        this.productos.push(nuevoProducto)
        await this.escribirArchivo()
        return transformarADTO(nuevoProducto)
    }

    async deleteById(id) {
        if (this.getIndex(id) === -1 ) {
            return {Error: `Producto con ID ${id} no encontrado`}
        } else {
            await this.leerArchivo()
            const [ borrada ] = this.productos.splice(this.getIndex(id), 1)
            await this.escribirArchivo()
            return transformarADTO(borrada)
        }
    }

    async deleteAll() {
        this.productos = []
        await this.escribirArchivo()
    }

    async updateById(id, nuevo) {
        if (this.getIndex(id) === -1 ) {
            return {Error: `Producto con ID ${id} no encontrado`}
        } else {
            await this.leerArchivo()
            const index = this.getIndex(id)
            const actualizado = { ...this.productos[index], ...nuevo}
            this.productos.splice(index, 1, actualizado)
            await this.escribirArchivo()
            return transformarADTO(actualizado)
        }
    }
}


// let prueba = new ProductosDaoFile('prueba.txt')
// await prueba.init()
// await prueba.leerArchivo()