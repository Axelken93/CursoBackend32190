export default class Producto {
    #id
    #nombre
    #categoria
    #precio

    constructor({nombre, categoria, precio, id }) {
        this.id = id
        this.nombre = nombre
        this.categoria = categoria
        this.precio = precio
    }

    get id() { return this.#id }

    set id(id) {
        if (!id) throw new Error('"id" es un campo requerido')
        this.#id = id
    }

    get nombre() { return this.#nombre }

    set nombre(nombre) {
        if (!nombre) throw new Error('"nombre" es un campo requerido')
        this.#nombre = nombre
    }

    get categoria() { return this.#categoria }

    set categoria(categoria) {
        if (!categoria) throw new Error('"categoria" es un campo requerido')
        this.#categoria = categoria
    }

    get precio() { return this.#precio }

    set precio(precio) {
        if (!precio) throw new Error('"precio" es un campo requerido')
        if (isNaN(precio)) throw new Error('"precio" es un campo de caracteres exclusivamente numéricos')
        this.#precio = precio
    }

    datos() {
        return JSON.parse(JSON.stringify({
            id: this.#id,
            nombre: this.#nombre,
            categoria: this.#categoria,
            precio: this.#precio
        }))
    }
}