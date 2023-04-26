import ProductosDaoFactory from "../daos/productsDaoFactory.js";
import { transformarADTO } from "../dtos/productsDtos.js";

export default class ProductosRepo {
    dao

    constructor() {
        this.dao = ProductosDaoFactory.getDao()
    }

    async getAll() {
        const productos = await this.dao.getAll()
        return productos.map(p => transformarADTO(p))
    }

    async getById(id) {
        const producto = await this.dao.getById(id)
        return producto
    }

    async getByCategory(categoria) {
        const producto = await this.dao.getByCategory(categoria)
        return producto
    }

    async save(nuevo) {
        if (!nuevo.nombre) {
            return {Error: "Campo 'Nombre' es requerido"}
        }
        if (!nuevo.categoria) {
            return {Error: "Campo 'Categoria' es requerido"}
        }
        if (!nuevo.precio) {
            return {Error: "Campo 'Precio' es requerido"}
        }
        if (typeof(nuevo.precio) !== 'number') {
            return {Error: "Campo 'Precio' tiene que ser de tipo numerico"}
        }

        let savedProduct = await this.dao.save(transformarADTO(nuevo))
        return savedProduct
    } 

    async deleteById(id) {
        const removida = await this.dao.deleteById(id)
        return removida
    }

    async deleteAll() {
        await this.dao.deleteAll()
        return {Estatus: 'Objeto eliminado correctamente'}
    }

    async updateById(id, obj) {
        let modificado = await this.dao.updateById(id, obj)
        return modificado
    }
}

