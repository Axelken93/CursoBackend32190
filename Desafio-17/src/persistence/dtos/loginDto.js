export default class UsersDTO {
    constructor({ username, password, id }) {
        this.username = username
        this.password = password
        this.id = id
    }
}

export function transformarADTO(obj) {
    if (Array.isArray(obj)) {
        return obj.map(p => new UsersDTO(p))
    } else {
        return new UsersDTO(obj)
    }
}