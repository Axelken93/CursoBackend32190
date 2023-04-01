import {productsDao} from "../daos/productsDaoFactory.js";
import { transformarADTO } from "../dtos/productsDto.js";
import Producto from "../models/products.js";


export default class ProductsRepo {
    dao

    constructor() {
        this.dao = productsDao
    }

    async getAll() {
        const producto = await this.dao.getAll()
        return producto.map(p => new Producto(p).datos())
    }

    async getById(id) {
        const producto = await this.dao.getById(id)
        return new Producto(producto)
    }

    async save(nuevo) {
        let objeto = await this.dao.save(transformarADTO(nuevo))
        return objeto
    } 

    async deleteById(id) {
        const removida = await this.dao.deleteById(id)
        return new Producto(removida)
    }

    async deleteAll() {
        await this.dao.deleteAll()
    }
}