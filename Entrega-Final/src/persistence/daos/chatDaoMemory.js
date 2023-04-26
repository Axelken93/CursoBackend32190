import {transformarADTO} from '../dtos/chatDto.js'

export default class ChatDaoMemory {
    
    constructor () {
        this.mensajes = []
    };

    async init() {
        console.log('mensajes dao en memoria -> listo!')
    }

    async assignedNewId() {
        if (this.mensajes.length === 0) {
            return 1
        } else {
            let IdArray = this.mensajes.map((x) => {return x.id})
            let newId = (Math.max(...IdArray)) + 1
            return newId
        }
    }

    getIndex(id) {
        return this.mensajes.findIndex(mensaje => mensaje.id === id)
    }

    async getAll() {   
        return transformarADTO(this.mensajes)
    };

    async getByMail(mail) {   
        let result = this.mensajes.filter(objeto => objeto.mail === mail);
        if (result.length === 0) {
            return {Error: `No se encontro ningun mensaje en el chat con el mail "${mail}"`}
        } else {
            return transformarADTO(result);
        }
    };
    
    async save(obj) {
        this.mensajes.push(obj)
        console.log('Objeto guardado correctamente')
        return transformarADTO(obj)
    };
};