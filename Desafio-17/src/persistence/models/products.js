export default class Producto {
    #title
    #price
    #thumbnail
    #id

    constructor({ title, price, thumbnail, id }) {
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
        this.id = id
    }

    get id() { return this.#id }

    set id(id) {
        if (!id) throw new Error('"id" es un campo requerido')
        this.#id = id
    }

    get title() { return this.#title }

    set title(title) {
        if (!title) throw new Error('"Title" es un campo requerido')
        this.#title = title
    }

    get thumbnail() { return this.#thumbnail }

    set thumbnail(thumbnail) {
        if (!thumbnail) throw new Error('"Thumbnail" es un campo requerido')
        this.#thumbnail = thumbnail
    }

    get price() { return this.#price }

    set price(price) {
        if (!price) throw new Error('"price" es un campo requerido')
        if (isNaN(price)) throw new Error('"price" es un campo de caracteres exclusivamente numéricos')
        this.#price = price
    }

    datos() {
        return JSON.parse(JSON.stringify({
            title: this.#title,
            price: this.#price,
            thumbnail: this.#thumbnail,
            id: this.#id
        }))
    }
}
