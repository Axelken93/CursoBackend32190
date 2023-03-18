export default class ProductDTO {
    constructor({ title, price, thumbnail, id }) {
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
        this.id = id
    }
}

export function transformarADTO(obj) {
    if (Array.isArray(obj)) {
        return obj.map(p => new ProductDTO(p))
    } else {
        return new ProductDTO(obj)
    }
}