export default class messagesDTO {
    constructor({ mail, nombre, apellido, edad, texto, fecha }) {
        this.mail = mail
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.texto = texto
        this.fecha = fecha
    }
}

export function transformarADTO(obj) {
    if (Array.isArray(obj)) {
        return obj.map(p => new messagesDTO(p))
    } else {
        return new messagesDTO(obj)
    }
}